import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
                {
                    path: "",
                    loadChildren: () =>
                        import("./pages/menu/app.main.module").then(
                            (m) => m.AppMainModule
                        ),
                },
            
            ],
            { scrollPositionRestoration: "enabled" }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
