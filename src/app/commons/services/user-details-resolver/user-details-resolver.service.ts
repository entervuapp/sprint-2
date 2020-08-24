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

@Injectable({
  providedIn: "root",
})
export class UserDetailsResolverService implements Resolve<any> {
  private SHARED_CONSTANTS = SHARED_CONSTANTS;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userDetailsService: UserDetailsService
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
      let userData = this.sharedService.getLoggedInUserDetails();
      return userData;
    }
  }
}
