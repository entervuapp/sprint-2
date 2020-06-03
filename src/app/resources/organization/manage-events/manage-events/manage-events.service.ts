import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../../commons/constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class ManageEventsService {
  constructor(private http: HttpClient) {}

  getEvents = (): Observable<any> => {
    let url = API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_EVENTS.GET_EVENTS;
    return this.http.get(url);
  };

  findEvent = (idx): Observable<any> => {
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_EVENTS.GET_EVENTS +
      "/" +
      idx;
    return this.http.get(url);
  };

  createEvent = (requestBody): Observable<any> => {
    const headersData = new HttpHeaders();
    headersData.append("Content-Type", "application/json");
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_EVENTS.CREATE_EVENTS;
    return this.http.post(url, requestBody, { headers: headersData });
  };

  updateEvent = (requestBody): Observable<any> => {
    const headersData = new HttpHeaders();
    headersData.append("Content-Type", "application/json");
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_EVENTS.CREATE_EVENTS +
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
