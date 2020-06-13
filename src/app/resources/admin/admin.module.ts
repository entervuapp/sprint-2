import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MaterialComponentsModule } from "../../commons/material-components/material-components.module";
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonsModule} from '../../commons/commons.module';

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { ManageSkillsComponent } from "./manage-skills/manage-skills.component";

//services
import { ManageSkillsService } from "./manage-skills/manage-skills/manage-skills.service";

const SERVICES_LIST = [ManageSkillsService];
const COMPONENTS_LIST = [AdminDashboardComponent, ManageSkillsComponent];

@NgModule({
  declarations: [COMPONENTS_LIST],
  imports: [CommonModule, AdminRoutingModule, MaterialComponentsModule, FontAwesomeModule, ReactiveFormsModule, FormsModule, CommonsModule],
  providers: [SERVICES_LIST],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {}
