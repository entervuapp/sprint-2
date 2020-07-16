import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  MatAutocompleteModule,
  MatInputModule,
  MatButtonModule,
  MatDialogContent,
  MatDialogActions,
} from "@angular/material";
import { MatDialogModule } from "@angular/material/dialog";

const MATERIALS_LIST = [
  MatAutocompleteModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, MATERIALS_LIST],
  exports: [MATERIALS_LIST],
})
export class MaterialComponentsModule {}
