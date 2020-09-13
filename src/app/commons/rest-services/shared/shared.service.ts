import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../constants/api-urls";
import { SHARED_CONSTANTS } from "../../constants/shared.constants";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  private SHARED_CONSTANTS = SHARED_CONSTANTS;

  constructor(private http: HttpClient) {}

  public getLoggedInUserDetails = (type): Observable<any> => {
    let url = "";
    if (!type) {
      console.log("without user hitting user details");
      return;
    }
    switch (type) {
      case this.SHARED_CONSTANTS.USER_TYPES.ORGANIZATION[0]:
      case this.SHARED_CONSTANTS.USER_TYPES.ORGANIZATION[1]:
        url = API_URLS_CONSTANTS.API_URLS.ORGANIZATION.USER.GET_PROFILE;
        break;
      case this.SHARED_CONSTANTS.USER_TYPES.CANDIDATE[0]:
        url = API_URLS_CONSTANTS.API_URLS.INDIVIDUAL.USER.GET_PROFILE;
        break;
    }
    return this.http.get(url);
  };
}
