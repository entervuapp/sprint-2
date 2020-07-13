import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../../commons/constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class ManageHrTeamService {
  constructor(private http: HttpClient) {}

  public getTeamMembers = (companyCode): Observable<any> => {
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_HR_TEAM.GET_TEAM_MEMBERS +
      companyCode +
      "/team";
    return this.http.get(url);
  };

  public findEvent = (idx): Observable<any> => {
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_HR_TEAM.GET_TEAM_MEMBERS +
      "/" +
      idx;
    return this.http.get(url);
  };

  public addMember = (requestBody): Observable<any> => {
    const headersData = new HttpHeaders();
    headersData.append("Content-Type", "application/json");
    let url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_HR_TEAM.ADD_TEAM_MEMBERS;
    return this.http.post(url, requestBody, { headers: headersData });
  };

  public deleteTeamMember = (idx): Observable<any> => {
    let url = API_URLS_CONSTANTS.API_URLS.DELETE_USER.URL;
    return this.http.delete(url);
  };
}
