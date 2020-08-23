import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { NULL_EXPR } from "@angular/compiler/src/output/output_ast";

@Injectable({
  providedIn: "root",
})
export class UserDetailsService {
  private userDetailsObject: object = null;

  constructor() {}

  public get = (): object => {
    return this.userDetailsObject;
  };

  public set = (userData: object): void => {
    if (userData) {
      this.userDetailsObject = userData;
    } else {
      this.userDetailsObject = null;
    }
  };
}
