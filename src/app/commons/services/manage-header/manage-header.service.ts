import { Injectable } from '@angular/core';
import {Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageHeaderService {
  private showHeader = new Subject<boolean>();

  updateHeaderVisibility(flag: boolean) {
    this.showHeader.next(flag);
  }

  getHeaderVisibility(): Observable<any> {
      return this.showHeader.asObservable();
  }
}
