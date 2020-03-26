import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QaSampleComponent } from "./qa-sample/qa-sample.component";

const COMPONENTS_LIST = [QaSampleComponent];

@NgModule({
  declarations: [COMPONENTS_LIST],
  imports: [CommonModule]
})
export class QaModule {}
