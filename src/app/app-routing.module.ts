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
import { ManageCandidatesComponent } from "./resources/organization/manage-candidates/manage-candidates.component";
import { OnGoingEventOrganizationComponent } from "./resources/organization/on-going-event-organization/on-going-event-organization.component";
import { AdminDashboardComponent } from "./resources/admin/admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: MainScreenComponent,
    // component: DashboardIndividualComponent,
    // component: DashboardOrganizationComponent,
    pathMatch: "full",
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.INDIVIDUAL_DASHBOARD,
    component: DashboardIndividualComponent,
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ORGANIZATION_DASHBOARD,
    component: DashboardOrganizationComponent,
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.EDIT_ORGANIZATION_PROFILE,
    component: EditProfileOrganizationComponent,
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.CHANGE_PASSWORD,
    component: ChangePasswordComponent,
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.LOGOUT,
    component: MainScreenComponent,
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.QA_DASHBOARD,
    component: QaDashboardComponent,
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.MANAGE_CANDIDATE,
    component: ManageCandidatesComponent,
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ON_GOING_EVENT_ORGANIZATION,
    component: OnGoingEventOrganizationComponent,
  },
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.ADMIN,
    component: AdminDashboardComponent,
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
