import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../../commons/constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class EditProfileIndividualService {
  constructor(private http: HttpClient) {}

  public getProfile = (idx): Observable<any> => {
    let url = API_URLS_CONSTANTS.API_URLS.INDIVIDUAL.USER.GET_PROFILE + idx;
    return this.http.get(url);
  };

  public updateProfile = (requestBody): Observable<any> => {
    const headersData = new HttpHeaders();
    headersData.append("Content-Type", "application/json");
    let url = API_URLS_CONSTANTS.API_URLS.INDIVIDUAL.USER.UPDATE_PROFILE;
    return this.http.put(url, requestBody, { headers: headersData });
  };
}
