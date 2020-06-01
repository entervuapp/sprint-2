import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ROUTE_URL_PATH_CONSTANTS } from "./commons/constants/route-url-path.constants";

import { DashboardIndividualComponent } from "./resources/individual/dashboard-individual/dashboard-individual.component";
import { MainScreenComponent } from "./resources/main-screen/main-screen.component";
import { PageNotFoundComponent } from "./commons/components/page-not-found/page-not-found.component";
import { DashboardOrganizationComponent } from "./resources/organization/dashboard-organization/dashboard-organization.component";
import { EditProfileOrganizationComponent } from "./resources/organization/edit-profile-organization/edit-profile-organization.component";
import { ChangePasswordComponent } from "./commons/components/change-password/change-password.component";
import { QaDashboardComponent } from "./resources/qa/qa-dashboard/qa-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: MainScreenComponent,
    pathMatch: "full",
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.individualDashboard,
    component: DashboardIndividualComponent,
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.organizationDashboard,
    component: DashboardOrganizationComponent,
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.editOrganizationProfile,
    component: EditProfileOrganizationComponent,
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.changePassword,
    component: ChangePasswordComponent,
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.logout,
    component: MainScreenComponent,
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.qaDashboard,
    component: QaDashboardComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
