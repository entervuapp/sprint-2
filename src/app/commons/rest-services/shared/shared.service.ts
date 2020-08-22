import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  constructor(private http: HttpClient) {}

  public getLoggedInUserDetails = (): Observable<any> => {
    // let url = API_URLS_CONSTANTS.API_URLS.ORGANIZATION.PROFILE.GET_USER_PROFILE;
    let url =
      "https://visakharoyalinteriors.herokuapp.com/entervu/company/user";
    return this.http.get(url);
  };
}
