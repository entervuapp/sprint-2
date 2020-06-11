import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
}
