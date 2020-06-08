import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  MatAutocompleteModule,
  MatInputModule,
  MatButtonModule,
} from "@angular/material";

const MATERIALS_LIST = [MatAutocompleteModule, MatInputModule, MatButtonModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, MATERIALS_LIST],
  exports: [MATERIALS_LIST],
})
export class MaterialComponentsModule {}
