import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventsPage } from "./features/events/events.component";

const routes: Routes = [
    { path: "", loadComponent:()=> import("./features/home/home.component").then(m=>m.HomePage) },
    { path: "events", component: EventsPage },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}