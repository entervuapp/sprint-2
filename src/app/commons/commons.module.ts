import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "./components/components.module";
import { RestServicesModule } from "./rest-services/rest-services.module";
import { DirectivesModule } from "./directives/directives.module";
import { UtilsModule } from "./utils/utils.module";
import { ConstantsModule } from "./constants/constants.module";
import { ServicesModule } from "./services/services.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MaterialComponentsModule } from "./material-components/material-components.module";

const COMMONS_MODULES_LIST = [
  CommonModule,
  ComponentsModule,
  RestServicesModule,
  DirectivesModule,
  UtilsModule,
  ConstantsModule,
  ServicesModule,
  FontAwesomeModule,
  MaterialComponentsModule,
];

@NgModule({
  declarations: [],
  imports: [...COMMONS_MODULES_LIST],
  exports: [...COMMONS_MODULES_LIST],
})
export class CommonsModule {}
