import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../../commons/constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class ManageEventsService {
  constructor(private http: HttpClient) {}

  getEvents = (requestBody): Observable<any> => {
    let params = new HttpParams();
    Object.keys(requestBody).forEach((key) => {
      params = params.set(key, requestBody[key]);
    });
    let url = API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_EVENTS.GET_EVENTS;
    return this.http.get(url, { params });
  };

  findEvent = (requestBody): Observable<any> => {
    let params = new HttpParams();
    Object.keys(requestBody).forEach((key) => {
      params = params.set(key, requestBody[key]);
    });
    let url = API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_EVENTS.GET_EVENTS;
    return this.http.get(url, { params });
  };

  createEvent = (requestBody): Observable<any> => {
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_EVENTS.CREATE_EVENTS;
    return this.http.post(url, requestBody);
  };

  updateEvent = (requestBody): Observable<any> => {
    const headersData = new HttpHeaders();
    headersData.append("Content-Type", "application/json");
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_EVENTS.UPDATE_EVENTS +
      "/" +
      requestBody.id;
    return this.http.put(url, requestBody, { headers: headersData });
  };

  deleteEvent = (idx): Observable<any> => {
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_EVENTS.CREATE_EVENTS +
      "/" +
      idx;
    return this.http.delete(url);
  };
}
