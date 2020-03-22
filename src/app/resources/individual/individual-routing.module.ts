import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardIndividualComponent } from "./dashboard-individual/dashboard-individual.component";
import ROUTE_URL_PATH_CONSTANTS from "../../commons/constants/route-url-path.constants";
const routes: Routes = [
  {
    path: ROUTE_URL_PATH_CONSTANTS.individualDashboard,
    component: DashboardIndividualComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualRoutingModule {}
