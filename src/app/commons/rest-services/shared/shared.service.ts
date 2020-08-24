import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  constructor(private http: HttpClient) {}

  public getLoggedInUserDetails = (type): Observable<any> => {
    let url = "";
    if (type === "Organization") {
      url = API_URLS_CONSTANTS.API_URLS.ORGANIZATION.USER.GET_PROFILE;
    } else if (type === "Individual") {
      url = API_URLS_CONSTANTS.API_URLS.INDIVIDUAL.USER.GET_PROFILE;
    }
    return this.http.get(url);
  };
}
