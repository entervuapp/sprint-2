import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QaDashboardComponent } from "./qa-dashboard/qa-dashboard.component";

const COMPONENTS_LIST = [QaDashboardComponent];

@NgModule({
  declarations: [COMPONENTS_LIST],
  imports: [CommonModule],
})
export class QaModule {}
