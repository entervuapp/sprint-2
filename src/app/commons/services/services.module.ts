import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingInterceptorService } from "./loading-interceptor/loading-interceptor.service";
import { LoaderService } from "./loader/loader.service";
import { ManageHeaderService } from "./manage-header/manage-header.service";

const SERVICES_LIST = [
  LoadingInterceptorService,
  LoaderService,
  ManageHeaderService,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [...SERVICES_LIST],
})
export class ServicesModule {}
