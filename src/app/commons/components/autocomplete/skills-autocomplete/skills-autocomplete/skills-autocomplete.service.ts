import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../../constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class SkillsAutocompleteService {
  constructor(private http: HttpClient) {}

  public getSkills = (): Observable<any> => {
    const url = API_URLS_CONSTANTS.API_URLS.ADMIN.SKILLS.GET_SKILLS;
    return this.http.get(url);
  };
}
