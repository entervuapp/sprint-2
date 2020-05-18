import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const PIPES_LIST = [];

@NgModule({
  declarations: PIPES_LIST,
  exports: PIPES_LIST,
  imports: [CommonModule],
  providers: PIPES_LIST,
})
export class PipesModule {}
