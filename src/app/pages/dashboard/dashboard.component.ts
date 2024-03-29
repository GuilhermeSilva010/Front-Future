import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Paginator } from 'primeng/paginator/paginator';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ApiResponseI } from 'src/app/shared/apiresponse.model';
import { DashI } from '../dashboard/dashboard.model';
import { DashboardService } from '../dashboard/dashboard.service';
import { merge, of } from "rxjs";
import { SaveEditableRow } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading: boolean = true;

  dashs: DashI[];
  dash: DashI;
  teste: number;
  isShowDialog: boolean = false;
  dialogMessage: String;
  dialogTitle: String;

  isShowAlterDialog: boolean = false;
  alterDialogTitle: String;

  form: FormGroup;
  form2: FormGroup;

  counter: number = 0;
  @ViewChild("pg", { static: true }) public paginator: Paginator;

  constructor(private fb: FormBuilder, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.form = this.fb.group({
      valor: new FormControl("", [
        Validators.required
      ]),
      name: new FormControl("", [
        Validators.required
      ]),
      id: new FormControl(1),
    });

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
          this.dashboardService.list(this.form2.getRawValue())
        ),
        tap(() => (this.loading = false))
      )
      .subscribe((values) => {
        this.dashs = [];
        this.paginator.changePage(0);
        this.getCounter();
        merge(this.dashs, values.data).subscribe((values) =>
          this.dashs.push(values)
        );
      });

    this.form2
      .get("page")
      .valueChanges.pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap(() =>
          this.dashboardService.list(this.form2.getRawValue())
        ),
        tap(() => (this.loading = false))
      )
      .subscribe((values) => {
        this.dashs = [];
        merge(this.dashs, values.data).subscribe((values) =>
          this.dashs.push(values)
        );
      });

    this.form2
      .get("rows")
      .valueChanges.pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap(() =>
          this.dashboardService.list(this.form2.getRawValue())
        ),
        tap(() => (this.loading = false))
      )
      .subscribe((values) => {
        this.dashs = [];
        merge(this.dashs, values.data).subscribe((values) =>
          this.dashs.push(values)
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
    this.dashboardService
      .count(this.form2.getRawValue())
      .subscribe((value) => (this.counter = value.data));
  }

  paginate(event) {
    this.form2.patchValue({ page: event.page });
    this.form2.patchValue({ rows: event.rows });
  }

  refresh() {
    this.loading = true;
    this.dashs = [];
    this.dashboardService
      .list(this.form2.getRawValue())
      .subscribe((dash) => {
        if ((dash as ApiResponseI).code != 200) {
          this.showDialog(
            "Ops, algum erro aconteceu.",
            (dash as ApiResponseI).msg
          );
        }
        this.dashs = (dash as ApiResponseI).data as DashI[];
        this.getCounter();
        this.loading = false;
      });
  }

  save(){
    this.dashboardService.add(this.form.value).subscribe(
      
        (val: ApiResponseI) => {
            if (val.code == 304)
                this.showDialog(
                    "Registro já existente!",
                    val.msg
                );
            else if (val.code == 200) {
                this.isShowAlterDialog = false;
                this.showDialog(
                    "Registro adicionado com sucesso.",
                    val.msg
                );
                this.refresh();
            } else if (
                val.code == 404 ||
                val.msg == "PROFILE_NOT_AUTHORIZED"
            ) {
                this.isShowAlterDialog = false;
                this.showDialog(
                    "O registro não foi adicionado.",
                    val.msg
                );
                this.refresh();
            }
        },
        (error) => {
            this.restfulException(error.msg);
        }
    
    );
  }
  restfulException(msg: String) {
    this.showDialog("Ocorreu um erro.", msg);
}
}