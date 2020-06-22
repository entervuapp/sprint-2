import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class ChangePasswordService {
  constructor(private http: HttpClient) {}

  updatePassword = (requestBody): Observable<any> => {
    let url = API_URLS_CONSTANTS.API_URLS.CHANGE_PASSWORD.URL;
    return this.http.post(url, requestBody);
  };
}
