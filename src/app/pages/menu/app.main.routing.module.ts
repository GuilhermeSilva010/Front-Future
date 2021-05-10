import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppMainComponent } from "./app.main.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "",
                component: AppMainComponent,
                children: [
                    {
                        path: "dashboard",
                        component: DashboardComponent,
                    },
                    
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AppMainRoutingModule { }
