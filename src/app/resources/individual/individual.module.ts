import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IndividualRoutingModule } from "./individual-routing.module";
import { DashboardIndividualComponent } from "./dashboard-individual/dashboard-individual.component";
import { RegistrationIndividualComponent } from "./registration-individual/registration-individual.component";
import { CommonsModule } from "../../commons/commons.module";
import { DirectivesModule } from "../../commons/directives/directives.module";
import { EditProfileIndividualComponent } from "./edit-profile-individual/edit-profile-individual.component";

const INDIVIDUAL_SCREENS = [
  DashboardIndividualComponent,
  RegistrationIndividualComponent,
  EditProfileIndividualComponent
];

@NgModule({
  declarations: [...INDIVIDUAL_SCREENS],
  imports: [
    CommonModule,
    IndividualRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonsModule,
    DirectivesModule
  ],
  exports: [...INDIVIDUAL_SCREENS]
})
export class IndividualModule {}
