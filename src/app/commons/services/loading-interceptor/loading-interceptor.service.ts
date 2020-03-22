import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from "../loader/loader.service";

@Injectable({
  providedIn: "root"
})
export class LoadingInterceptorService implements HttpInterceptor {
  counter: number = 0;
  constructor(private loaderService: LoaderService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.counter++;
    this.loaderService.show();
    return next.handle(request).pipe(
      finalize(() => {
        this.counter = this.counter - 1;
        if (this.counter === 0) {
          this.loaderService.hide();
        }
      })
    );
  }
}
