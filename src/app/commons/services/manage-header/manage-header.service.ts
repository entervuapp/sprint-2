import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ManageHeaderService {
  private showHeader = new Subject<boolean>();

  public updateHeaderVisibility = (flag: boolean): void => {
    this.showHeader.next(flag);
  };

  public getHeaderVisibility = (): Observable<any> => {
    return this.showHeader.asObservable();
  };
}
