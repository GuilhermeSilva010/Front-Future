import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-menu",
    template: `
        <div class="menu">
            <ul class="layout-menu">
                <li
                    app-menuitem
                    *ngFor="let item of model; let i = index"
                    [item]="item"
                    [index]="i"
                    [root]="true"
                ></li>
            </ul>
        </div>
    `,
})
export class AppMenuComponent implements OnInit {

    constructor(private router: Router) { }

    model: any[] = [];
    ngOnInit() {
        this.model = [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
           
           
        
        ];
    }
}
