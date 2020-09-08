import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../../commons/constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class EditProfileOrganizationService {
  constructor(private http: HttpClient) {}

  public updateProfile = (requestBody): Observable<any> => {
    let url = API_URLS_CONSTANTS.API_URLS.ORGANIZATION.USER.UPDATE_ORGANIZATION;
    return this.http.put(url, requestBody);
  };
}
