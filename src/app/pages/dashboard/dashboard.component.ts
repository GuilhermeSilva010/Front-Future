import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Paginator } from 'primeng/paginator/paginator';
import { debounceTime, distinctUntilChanged, merge, switchMap, tap } from 'rxjs/operators';
import { DashI } from '../dashboard/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashs: DashI[];
  dash: DashI;

  form: FormGroup;
  form2: FormGroup;

  counter: number = 0;
  @ViewChild("pg", { static: true }) public paginator: Paginator;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
        valor: new FormControl("", [
            Validators.required
        ]),
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
                this.siteService.listPage(this.form2.getRawValue())
            ),
            tap(() => (this.loading = false))
        )
        .subscribe((values) => {
            this.sites = [];
            this.paginator.changePage(0);
            this.getCounter();
            merge(this.sites, values.data).subscribe((values) =>
                this.sites.push(values)
            );
        });

    this.form2
        .get("page")
        .valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap(() => (this.loading = true)),
            switchMap(() =>
                this.siteService.listPage(this.form2.getRawValue())
            ),
            tap(() => (this.loading = false))
        )
        .subscribe((values) => {
            this.sites = [];
            merge(this.sites, values.data).subscribe((values) =>
                this.sites.push(values)
            );
        });

    this.form2
        .get("rows")
        .valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap(() => (this.loading = true)),
            switchMap(() =>
                this.siteService.listPage(this.form2.getRawValue())
            ),
            tap(() => (this.loading = false))
        )
        .subscribe((values) => {
            this.sites = [];
            merge(this.sites, values.data).subscribe((values) =>
                this.sites.push(values)
            );
        });
    this.refresh();
}

  getCounter() {
    this.siteService
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
    this.siteService
        .listPage(this.form2.getRawValue())
        .subscribe((sites) => {
            if ((dash as ApiResponseI).code != 200) {
                this.showDialog(
                    "Ops, algum erro aconteceu.",
                    (sites as ApiResponseI).msg
                );
            }
            this.dashs = (dashs as ApiResponseI).data as DashI[];
            this.getCounter();
            this.loading = false;
        });
  } 
}