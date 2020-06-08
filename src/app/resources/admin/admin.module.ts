import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialComponentsModule } from "../../commons/material-components/material-components.module";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { ManageSkillsComponent } from "./manage-skills/manage-skills.component";

const COMPONENTS_LIST = [AdminDashboardComponent, ManageSkillsComponent];

@NgModule({
  declarations: [COMPONENTS_LIST],
  imports: [CommonModule, AdminRoutingModule, MaterialComponentsModule],
  providers: [],
})
export class AdminModule {}
