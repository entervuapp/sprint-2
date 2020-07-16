import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS_CONSTANTS } from "../../../../constants/api-urls";

@Injectable({
  providedIn: "root",
})
export class EmailAutocompleteService {
  constructor(private http: HttpClient) {}

  public findCandidateByEmail = (email): Observable<any> => {
    const url =
      API_URLS_CONSTANTS.API_URLS.ORGANIZATION.MANAGE_CANDIDATES
        .FIND_CANDIDATE_BY_EMAIL + email;
    return this.http.get(url);
  };
}
