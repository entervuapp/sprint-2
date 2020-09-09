import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../../commons/constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class DashboardIndividualService {
  constructor(private http: HttpClient) {}

  public getUserMappedEvents = (idx): Observable<any> => {
    let url =
      API_URLS_CONSTANTS.API_URLS.INDIVIDUAL.MANAGE_EVENTS
        .GET_INDIVIDUAL_EVENTS + idx;
    return this.http.get(url);
  };
}
