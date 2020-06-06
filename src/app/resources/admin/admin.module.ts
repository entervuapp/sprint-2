import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";

const COMPONENTS_LIST = [AdminDashboardComponent];

@NgModule({
  declarations: [COMPONENTS_LIST],
  imports: [CommonModule, AdminRoutingModule],
  providers: [],
})
export class AdminModule {}
