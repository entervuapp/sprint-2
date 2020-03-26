import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingInterceptorService } from "./loading-interceptor/loading-interceptor.service";
import { LoaderService } from "./loader/loader.service";
import { ManageHeaderService } from "./manage-header/manage-header.service";
import { CanDeactivateGuardService } from "./can-deactivate-guard/can-deactivate-guard.service";
import { LocalStorageService } from "./local-storage/local-storage.service";
import { WindowRefService } from "./window-ref/window-ref.service";

const SERVICES_LIST = [
  LoadingInterceptorService,
  LoaderService,
  ManageHeaderService,
  CanDeactivateGuardService,
  LocalStorageService,
  WindowRefService
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [...SERVICES_LIST]
})
export class ServicesModule {}
