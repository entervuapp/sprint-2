import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../../commons/constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class ManageSkillsService {
  constructor(private http: HttpClient) {}

  getSkills = (): Observable<any> => {
    let url = API_URLS_CONSTANTS.API_URLS.ADMIN.SKILLS.GET_SKILLS;
    return this.http.get(url);
  };

  findSkills = (requestBody): Observable<any> => {
    let url = API_URLS_CONSTANTS.API_URLS.ADMIN.SKILLS.FIND_SKILLS;
    return this.http.post(url, requestBody);
  };

  createSkill = (requestBody): Observable<any> => {
    const headersData = new HttpHeaders();
    headersData.append("Content-Type", "application/json");
    let url = API_URLS_CONSTANTS.API_URLS.ADMIN.SKILLS.CREATE_SKILLS;
    return this.http.post(url, requestBody, { headers: headersData });
  };

  updateSkill = (requestBody): Observable<any> => {
    const headersData = new HttpHeaders();
    headersData.append("Content-Type", "application/json");
    let url =
      API_URLS_CONSTANTS.API_URLS.ADMIN.SKILLS.UPDATE_SKILLS +
      "/" +
      requestBody.id;
    return this.http.put(url, requestBody, { headers: headersData });
  };

  deleteSkill = (paramsData): Observable<any> => {
    let params = new HttpParams();
    Object.keys(paramsData).forEach((key) => {
      params = params.set(key, paramsData[key]);
    });
    let url = API_URLS_CONSTANTS.API_URLS.ADMIN.SKILLS.DELETE_SKILLS;
    return this.http.delete(url, { params });
  };
}
