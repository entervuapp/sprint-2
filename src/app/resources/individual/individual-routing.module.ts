import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardIndividualComponent } from "./dashboard-individual/dashboard-individual.component";
import { ROUTE_URL_PATH_CONSTANTS } from "../../commons/constants/route-url-path.constants";
import { RegistrationIndividualService } from "./registration-individual/registration-individual/registration-individual.service";
import { EditProfileIndividualService } from "./edit-profile-individual/edit-profile-individual/edit-profile-individual.service";
import { DashboardIndividualService } from "./dashboard-individual/dashboard-individual/dashboard-individual.service";

const routes: Routes = [
  {
    path: ROUTE_URL_PATH_CONSTANTS.ROUTE_URL_PATH.INDIVIDUAL_DASHBOARD,
    component: DashboardIndividualComponent,
  },
];
const SERVICES_LIST = [
  RegistrationIndividualService,
  EditProfileIndividualService,
  DashboardIndividualService,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SERVICES_LIST],
})
export class IndividualRoutingModule {}
