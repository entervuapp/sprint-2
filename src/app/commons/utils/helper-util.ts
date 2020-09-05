import { Injectable } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AlertService } from "../services/alert/alert.service";
import { LocalStorageService } from "../services/local-storage/local-storage.service";
import { SHARED_CONSTANTS } from "../constants/shared.constants";
import { UserDetailsService } from "../services/user-details/user-details.service";

@Injectable()
export class HelperUtil {
  private SHARED_CONSTANTS = SHARED_CONSTANTS;

  constructor(
    private alertService: AlertService,
    public localStorageService: LocalStorageService,
    private userDetailsService: UserDetailsService
  ) {}
}
