import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Paginator } from 'primeng/paginator/paginator';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ApiResponseI } from 'src/app/shared/apiresponse.model';
import { CotasService } from '../cotas/cotas.service';
import { merge, of } from "rxjs";
import { SaveEditableRow } from 'primeng/table';
import {CotasI} from '../cotas/cotas.model';

@Component({
  selector: 'app-cotas',
  templateUrl: './cotas.component.html',
  styleUrls: ['./cotas.component.scss']
})


export class CotasComponent implements OnInit {

  loading: boolean = true;

  cotas: CotasI[];
  cota: CotasI;
  teste: number;
  isShowDialog: boolean = false;
  dialogMessage: String;
  dialogTitle: String;

  isShowAlterDialog: boolean = false;
  alterDialogTitle: String;

  form2: FormGroup;

  counter: number = 0;
  @ViewChild("pg", { static: true }) public paginator: Paginator;

  constructor(private fb: FormBuilder, private cotasService: CotasService) { }

  ngOnInit() {

    this.form2 = this.fb.group({
      data: new FormControl(""),
      page: new FormControl(0),
      rows: new FormControl(10),
    });

    this.form2
      .get("data")
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap(() =>
          this.cotasService.list(this.form2.getRawValue())
        ),
        tap(() => (this.loading = false))
      )
      .subscribe((values) => {
        this.cotas = [];
        this.paginator.changePage(0);
        this.getCounter();
        merge(this.cotas, values.data).subscribe((values) =>
          this.cotas.push(values)
        );
      });

    this.form2
      .get("page")
      .valueChanges.pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap(() =>
          this.cotasService.list(this.form2.getRawValue())
        ),
        tap(() => (this.loading = false))
      )
      .subscribe((values) => {
        this.cotas = [];
        merge(this.cotas, values.data).subscribe((values) =>
          this.cotas.push(values)
        );
      });

    this.form2
      .get("rows")
      .valueChanges.pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap(() =>
          this.cotasService.list(this.form2.getRawValue())
        ),
        tap(() => (this.loading = false))
      )
      .subscribe((values) => {
        this.cotas = [];
        merge(this.cotas, values.data).subscribe((values) =>
          this.cotas.push(values)
        );
      });
    this.refresh();
  }

  showEditDialog() {
    this.alterDialogTitle = "Valor p/ Investir";
    this.isShowAlterDialog = true;
  }

  showDialog(title: String, msg: String) {
    this.dialogMessage = msg;
    this.dialogTitle = title;
    this.isShowDialog = true;
  }

  getCounter() {
    this.cotasService
      .count(this.form2.getRawValue())
      .subscribe((value) => (this.counter = value.data));
  }

  paginate(event) {
    this.form2.patchValue({ page: event.page });
    this.form2.patchValue({ rows: event.rows });
  }

  refresh() {
    this.loading = true;
    this.cotas = [];
    this.cotasService
      .list(this.form2.getRawValue())
      .subscribe((cota) => {
        if ((cota as ApiResponseI).code != 200) {
          this.showDialog(
            "Ops, algum erro aconteceu.",
            (cota as ApiResponseI).msg
          );
        }
        this.cotas = (cota as ApiResponseI).data as CotasI[];
        this.getCounter();
        this.loading = false;
      });
  }

}
