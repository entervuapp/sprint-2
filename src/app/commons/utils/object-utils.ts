import { Injectable } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AlertService } from "../services/alert/alert.service";

@Injectable()
export default class ObjectUtil {
  constructor(private alertService: AlertService) {}

  checkPasswordStrength = (enteredPassword) => {
    let array = [];
    if (enteredPassword && enteredPassword.length > 7) {
      array[0] = enteredPassword.match(/[A-Z]/);
      array[1] = enteredPassword.match(/[a-z]/);
      array[2] = enteredPassword.match(/\d/);
      array[3] = enteredPassword.match(/[!_.-@#$%^&*]/);
    }

    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i] ? 1 : 0;
    }
    return sum;
  };

  isPasswordAndConfirmPasswordMatching = (password, confirmPassword) => {
    return password === confirmPassword ? true : false;
  };

  checkEmailValidity = (enteredEmail) => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(enteredEmail);
  };

  checkForFormErrors = (formObj, property): boolean => {
    let isError = false;
    if (formObj && formObj instanceof FormGroup) {
      switch (property) {
        case "email":
        case "officeEmail":
          if (
            (formObj.controls[property].hasError("required") &&
              formObj.controls[property].touched) ||
            formObj.controls[property].hasError("email")
          ) {
            isError = true;
          }
          break;
        case "eventDate":
        case "eventTime":
        case "skillName":
        case "numberOfRounds":
        case "address":
        case "experience":
        case "mobile":
        case "comments":
        case "companyCode":
        case "companyName":
        case "name":
        case "firstName":
        case "description":
          if (
            ((formObj.controls[property].hasError("required") ||
              formObj.controls[property].hasError("duplicate")) &&
              formObj.controls[property].touched) ||
            formObj.controls[property].hasError("minlength") ||
            formObj.controls[property].hasError("maxlength")
          ) {
            isError = true;
          }
          break;
        case "value":
          if (
            ((formObj.controls[property].hasError("required") ||
              formObj.controls[property].hasError("duplicate")) &&
              formObj.controls[property].touched) ||
            formObj.controls[property].hasError("minlength") ||
            formObj.controls[property].hasError("maxlength")
          ) {
            isError = true;
          }
          break;
        case "skill":
          if (
            (formObj.controls[property]["controls"].description.hasError(
              "required"
            ) &&
              formObj.controls[property]["controls"].description.touched) ||
            formObj.controls[property]["controls"].description.hasError(
              "minlength"
            ) ||
            formObj.controls[property]["controls"].description.hasError(
              "maxlength"
            )
          ) {
            isError = true;
          }

          if (
            (formObj.controls[property]["controls"].description.hasError(
              "duplicate"
            ) &&
              formObj.controls[property]["controls"].description.touched) ||
            formObj.controls[property]["controls"].description.hasError(
              "minlength"
            ) ||
            formObj.controls[property]["controls"].description.hasError(
              "maxlength"
            )
          ) {
            isError = true;
          }

          break;
        case "password":
        case "currentPassword":
        case "newPassword":
          let passwordStrength = this.checkPasswordStrength(
            formObj.controls[property].value
          );
          if (
            (formObj.controls[property].hasError("required") ||
              formObj.controls[property].hasError("minlength") ||
              formObj.controls[property].value.length === 0) &&
            formObj.controls[property].touched
          ) {
            isError = true;
          } else if (formObj.controls[property].dirty && passwordStrength < 4) {
            isError = true;
            formObj.controls[property].setErrors({ weakPassword: true });
          }

          break;
        case "confirmNewPassword":
          let isConfirmPasswordMatching = this.isPasswordAndConfirmPasswordMatching(
            formObj.controls["newPassword"].value,
            formObj.controls[property].value
          );

          if (
            formObj.controls[property].hasError("required") &&
            formObj.controls[property].touched
          ) {
            isError = true;
          }

          if (
            isConfirmPasswordMatching === false &&
            (formObj.controls[property].touched ||
              formObj.controls[property].dirty)
          ) {
            isError = true;
            formObj.controls[property].setErrors({ mustMatch: true });
          }
          break;
        case "confirmPassword":
          let isPasswordMatching = this.isPasswordAndConfirmPasswordMatching(
            formObj.controls["password"].value,
            formObj.controls[property].value
          );

          if (
            formObj.controls[property].hasError("required") &&
            formObj.controls[property].touched
          ) {
            isError = true;
          }

          if (
            isPasswordMatching === false &&
            (formObj.controls[property].touched ||
              formObj.controls[property].dirty)
          ) {
            isError = true;
            formObj.controls[property].setErrors({ mustMatch: true });
          }
          break;
        default:
          break;
      }
    } else if (formObj && formObj instanceof FormControl) {
      switch (property) {
        case "time":
          var timeRegex = /^(([0-1][0-9])|(2[0-3])):[0-5][0-9]$/;
          //valid format HH:MM
          if (
            formObj.hasError("required") &&
            formObj.touched &&
            (formObj.value === "" ||
              formObj.value === null ||
              formObj.value === undefined)
          ) {
            isError = true;
          } else if (
            formObj &&
            formObj.value &&
            timeRegex.exec(formObj.value) === null
          ) {
            isError = true;
          }
          break;
        default:
          if (
            formObj.hasError("required") &&
            formObj.touched &&
            (formObj.value === "" ||
              formObj.value === null ||
              formObj.value === undefined)
          ) {
            isError = true;
          }
          break;
      }
    }
    return isError;
  };

  public showAlert = (alertList): void => {
    if (alertList) {
      this.alertService.set(alertList);
    }
  };
}
