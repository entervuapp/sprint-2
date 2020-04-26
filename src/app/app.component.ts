import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { ManageHeaderService } from "./commons/services/manage-header/manage-header.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "EnterVu";
  public isHeaderVisible: boolean;

  constructor(
    public manageHeaderService?: ManageHeaderService,
    private cdr?: ChangeDetectorRef,
    public router?: Router
  ) {
    this.isHeaderVisible = false;
    this.manageHeaderService.getHeaderVisibility().subscribe((flag) => {
      this.isHeaderVisible = flag;
      this.cdr.detectChanges();
    });
  }

  public navigateTo(screen: string, queryParams?): void {
    switch (screen) {
      case "path":
        // this.router.navigate([`/${RouteUrlPathConstants.ROUTE_URL_PATH.home}`], { queryParams: { page: queryParams } });
        break;
      default:
        break;
    }
  }

  public checkForEmptySearch(formObj: FormGroup): boolean {
    if (formObj && formObj.controls) {
      let isFormEmpty = false;
      let keysList = Object.keys(formObj.controls);
      for (let i = 0; i < keysList.length; i++) {
        const control = formObj.get(keysList[i]);
        if (control instanceof FormControl) {
          if (
            control &&
            control.value &&
            Array.isArray(control.value) &&
            control.value.length === 0
          ) {
            isFormEmpty = true;
          } else if (
            control &&
            (control.value === "" ||
              !control.value ||
              (typeof control.value !== "object" &&
                typeof control.value !== "string" &&
                typeof control.value !== "number" &&
                typeof control.value !== "boolean"))
          ) {
            isFormEmpty = true;
          } else {
            isFormEmpty = false;
            break;
          }
        } else if (control instanceof FormGroup) {
          this.checkForEmptySearch;
        }
      }
      return isFormEmpty;
    }
  }
}
