import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MaterialComponentsModule } from "../../commons/material-components/material-components.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonsModule } from "../../commons/commons.module";

//modules
import { AdminRoutingModule } from "./admin-routing.module";

//services
import { ManageSkillsService } from "./manage-skills/manage-skills/manage-skills.service";

//components
import { ManageSkillsComponent } from "./manage-skills/manage-skills.component";
import { AdminOrganizationComponent } from "./admin-organization/admin-organization.component";

const SERVICES_LIST = [ManageSkillsService];

const COMPONENTS_LIST = [ManageSkillsComponent, AdminOrganizationComponent];

@NgModule({
  declarations: [COMPONENTS_LIST],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialComponentsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    CommonsModule,
  ],
  providers: [SERVICES_LIST],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AdminModule {}
