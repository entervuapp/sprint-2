import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../../commons/constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class RegistrationOrganizationService {
  constructor(private http: HttpClient) {}

  public organizationSignUp = (requestBody): Observable<any> => {
    let url = API_URLS_CONSTANTS.API_URLS.ORGANIZATION.REGISTRATION.HR;
    return this.http.post(url, requestBody);
  };
}
