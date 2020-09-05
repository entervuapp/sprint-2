import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { OrganizationRoutingModule } from "./organization-routing.module";
import { RegistrationOrganizationComponent } from "./registration-organization/registration-organization.component";
import { CommonsModule } from "src/app/commons/commons.module";
import { DirectivesModule } from "src/app/commons/directives/directives.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EditProfileOrganizationComponent } from "./edit-profile-organization/edit-profile-organization.component";
import { ManageCandidatesComponent } from "./manage-candidates/manage-candidates.component";
import { ManageHrTeamComponent } from "./manage-hr-team/manage-hr-team.component";
import { ManageEventsComponent } from "./manage-events/manage-events.component";
import { OnGoingEventOrganizationComponent } from "./on-going-event-organization/on-going-event-organization.component";
import { ServicesModule } from "../../commons/services/services.module";
import { EditProfileHrComponent } from "./edit-profile-hr/edit-profile-hr.component";

//services
import { EditProfileHrService } from "./edit-profile-hr/edit-profile-hr/edit-profile-hr.service";
import { ManageCandidateService } from "./manage-candidates/manage-candidates/manage-candidate.service";
import { ManageEventsService } from "./manage-events/manage-events/manage-events.service";
import { ManageHrTeamService } from "./manage-hr-team/manage-hr-team/manage-hr-team.service";
import { RegistrationOrganizationService } from "./registration-organization/registration-organization/registration-organization.service";

const COMPONENTS_LIST = [
  RegistrationOrganizationComponent,
  EditProfileOrganizationComponent,
  ManageCandidatesComponent,
  ManageHrTeamComponent,
  ManageEventsComponent,
  OnGoingEventOrganizationComponent,
  EditProfileHrComponent,
];

const SERVICES_LIST = [
  ManageCandidateService,
  ManageEventsService,
  ManageHrTeamService,
  RegistrationOrganizationService,
  EditProfileHrService,
];
@NgModule({
  declarations: [...COMPONENTS_LIST],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonsModule,
    DirectivesModule,
    FontAwesomeModule,
    ServicesModule,
  ],
  exports: [...COMPONENTS_LIST],
  providers: [...SERVICES_LIST],
})
export class OrganizationModule {}
