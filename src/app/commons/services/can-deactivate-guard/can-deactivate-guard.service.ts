import { Injectable } from "@angular/core";
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

export interface CanDeactivateInterFace<T> {
  canDeactivate(
    component: T,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: "root"
})
export class CanDeactivateGuardService
  implements CanDeactivate<CanDeactivateGuardService> {
  canDeactivate(
    component: CanDeactivateGuardService,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    let url: string = state.url;
    console.log("Url in service:  " + url);

    return component.canDeactivate
      ? component.canDeactivate(component, route, state)
      : true;
  }
}
