import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../../commons/constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class RegistrationIndividualService {
  constructor(private http: HttpClient) {}

  public inidivualRegistration = (requestBody): Observable<any> => {
    let url = API_URLS_CONSTANTS.API_URLS.INDIVIDUAL.REGISTRATION.CANDIDATE;
    return this.http.post(url, requestBody);
  };
}
