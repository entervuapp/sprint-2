import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../../commons/constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class ManageCandidateService {
  constructor(private http: HttpClient) {}

  public getCandidates = (): Observable<any> => {
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_CANDIDATES.GET_CANDIDATES;
    return this.http.get(url);
  };

  public addCandidate = (requestBody): Observable<any> => {
    const headersData = new HttpHeaders();
    headersData.append("Content-Type", "application/json");
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_CANDIDATES.ADD_CANDIDATE;
    return this.http.post(url, requestBody, { headers: headersData });
  };

  public updateCandidate = (requestBody): Observable<any> => {
    const headersData = new HttpHeaders();
    headersData.append("Content-Type", "application/json");
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_CANDIDATES
        .UPDATE_CANDIDATE +
      "/" +
      requestBody.id;
    return this.http.put(url, requestBody, { headers: headersData });
  };

  public deleteEvent = (idx): Observable<any> => {
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_CANDIDATES
        .DELETE_CANDIDATE +
      "/" +
      idx;
    return this.http.delete(url);
  };
}
