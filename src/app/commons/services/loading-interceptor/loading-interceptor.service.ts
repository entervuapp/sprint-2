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
import { catchError } from "rxjs/operators";
import { AppComponent } from "src/app/app.component";
import { SHARED_CONSTANTS } from "../../constants/shared.constants";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { ObjectUtil } from "../../utils/object-utils";

@Injectable({
  providedIn: "root",
})
export class LoadingInterceptorService extends AppComponent
  implements HttpInterceptor {
  SHARED_CONSTANTS = SHARED_CONSTANTS;
  counter: number = 0;
  constructor(
    private loaderService: LoaderService,
    public localStorageService: LocalStorageService,
    private objectUtil: ObjectUtil
  ) {
    super();
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.counter++;
    this.loaderService.show();
    let authReq = null;
    if (
      this.localStorageService.get(
        this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_SESSION_TOKEN
      )
    ) {
      authReq = request.clone({
        headers: request.headers
          .set(
            "Authorization",
            "Bearer " +
              this.localStorageService.get(
                this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_SESSION_TOKEN
              )
          )
          .append("Access-Control-Allow-Origin", "*"),
      });
    }

    return next.handle(authReq ? authReq : request).pipe(
      // retry(1),
      catchError((errors: HttpErrorResponse) => {
        let errorMessage = "";
        if (errors && errors.error instanceof ErrorEvent) {
          //client error
          errorMessage = `Error: ${errors.error.message}`;
          console.log("From Interceptor, client side error", errorMessage);
          this.objectUtil.showAlert([
            ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR,
          ]);
        } else {
          //server side error
          errorMessage = `Error code: ${errors.status}\nMessage: ${errors.message}`;
          console.log("From Interceptor, server side error", errorMessage);
          this.objectUtil.showAlert([
            ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR,
          ]);
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
