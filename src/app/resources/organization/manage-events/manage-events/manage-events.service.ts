import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../../commons/constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class ManageEventsService {
  constructor(private http: HttpClient) {}

  public getEvents = (comapnyCode): Observable<any> => {
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_EVENTS.GET_EVENTS +
      comapnyCode;
    return this.http.get(url);
  };

  public findEvent = (eventId): Observable<any> => {
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_EVENTS.FIND_EVENTS +
      eventId;
    return this.http.get(url);
  };

  public createEvent = (requestBody): Observable<any> => {
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_EVENTS.CREATE_EVENTS;
    return this.http.post(url, requestBody);
  };

  public updateEvent = (requestBody): Observable<any> => {
    const headersData = new HttpHeaders();
    headersData.append("Content-Type", "application/json");
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_EVENTS.UPDATE_EVENTS +
      "/" +
      requestBody.id;
    return this.http.put(url, requestBody, { headers: headersData });
  };

  public deleteEvent = (paramsData): Observable<any> => {
    let params = new HttpParams();
    Object.keys(paramsData).forEach((key) => {
      params = params.set(key, paramsData[key]);
    });
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_EVENTS.DELETE_EVENT;
    return this.http.delete(url, { params });
  };
}
