import { AppComponent } from "src/app/app.component";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { SharedService } from "../../rest-services/shared/shared.service";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { SHARED_CONSTANTS } from "../../constants/shared.constants";
import { UserDetailsService } from "../user-details/user-details.service";
import { ObjectUtil } from "../../utils/object-utils";

@Injectable({
  providedIn: "root",
})
export class UserDetailsResolverService implements Resolve<any> {
  public SHARED_CONSTANTS = SHARED_CONSTANTS;

  constructor(
    public sharedService: SharedService,
    public router: Router,
    public localStorageService: LocalStorageService,
    public userDetailsService: UserDetailsService,
    public objectUtil: ObjectUtil
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    if (
      !this.userDetailsService.get() &&
      this.localStorageService.get(
        this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_SESSION_TOKEN
      )
    ) {
      let accessToken = this.localStorageService.get(
        this.SHARED_CONSTANTS["EVU_LOCAL_STORAGES"].LS_EVU_SESSION_TOKEN
      );
      let userData = this.sharedService.getLoggedInUserDetails(
        this.objectUtil.decodeUserType(accessToken)
      );
      return userData;
    }
  }
}
