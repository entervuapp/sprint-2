import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedService } from "./shared/shared.service";

const SERVICE_LIST = [SharedService];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SERVICE_LIST],
})
export class RestServicesModule {}
