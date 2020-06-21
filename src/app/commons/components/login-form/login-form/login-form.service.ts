import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class LoginFormService {
  constructor(private http: HttpClient) {}

  signIn = (requestBody): Observable<any> => {
    let url = API_URLS_CONSTANTS.API_URLS.LOGIN_SCREEN.SIGN_IN;
    return this.http.post(url, requestBody);
  };

  organizationSignUp = (requestBody): Observable<any> => {
    let url = API_URLS_CONSTANTS.API_URLS.ORGANIZATION.REGISTRATION.HR;
    return this.http.post(url, requestBody);
  };

  inidivualRegistration = (requestBody): Observable<any> => {
    let url = API_URLS_CONSTANTS.API_URLS.INDIVIDUAL.REGISTRATION.CANDIDATE;
    return this.http.post(url, requestBody);
  };
}
