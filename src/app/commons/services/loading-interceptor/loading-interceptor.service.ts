import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from "../loader/loader.service";
import { retry, catchError } from "rxjs/operators";
import { AppComponent } from "src/app/app.component";

@Injectable({
  providedIn: "root",
})
export class LoadingInterceptorService extends AppComponent
  implements HttpInterceptor {
  counter: number = 0;
  constructor(private loaderService: LoaderService) {
    super();
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.counter++;
    this.loaderService.show();
    return next.handle(request).pipe(
      // retry(1),
      catchError((errors: HttpErrorResponse) => {
        let errorMessage = "";
        if (errors && errors.error instanceof ErrorEvent) {
          //client error
          errorMessage = `Error: ${errors.error.message}`;
          console.log("From Interceptor, client side error", errorMessage);
        } else {
          //server side error
          errorMessage = `Error code: ${errors.status}\nMessage: ${errors.message}`;
          console.log("From Interceptor, server side error", errorMessage);
        }
        return throwError(errorMessage);
      }),
      finalize(() => {
        this.counter = this.counter - 1;
        if (this.counter === 0) {
          this.loaderService.hide();
        }
      })
    );
  }
}
