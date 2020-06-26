import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class LoginFormService {
  constructor(private http: HttpClient) {}

  public signIn = (requestBody): Observable<any> => {
    let url = API_URLS_CONSTANTS.API_URLS.LOGIN_SCREEN.SIGN_IN;
    return this.http.post(url, requestBody);
  };
}
