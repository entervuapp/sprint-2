import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import ROUTE_URL_PATH_CONSTANTS from "./commons/constants/route-url-path.constants";

import { DashboardIndividualComponent } from "./resources/individual/dashboard-individual/dashboard-individual.component";
import { MainScreenComponent } from "./resources/main-screen/main-screen.component";
import { PageNotFoundComponent } from "./commons/components/page-not-found/page-not-found.component";
import { DashboardOrganizationComponent } from "./resources/organization/dashboard-organization/dashboard-organization.component";

const routes: Routes = [
  {
    path: "",
    component: MainScreenComponent,
    pathMatch: "full"
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.individualDashboard,
    component: DashboardIndividualComponent
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.organizationDashboard,
    component: DashboardOrganizationComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
