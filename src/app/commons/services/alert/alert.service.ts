import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  private alertObservable: BehaviorSubject<any>;
  constructor() {}

  public get = (): Observable<any> => {
    this.alertObservable = new BehaviorSubject<any>(this.alertObservable);
    return this.alertObservable;
  };

  public set = (value): void => {
    if (this.alertObservable && value) {
      this.alertObservable.next(value);
    }
  };
}
