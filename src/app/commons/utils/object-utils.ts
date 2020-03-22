export default class ObjectUtil {
  checkPasswordStrength = enteredPassword => {
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

  checkEmailValidity = enteredEmail => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(enteredEmail);
  };

  checkForFormErrors = (formObj, property): boolean => {
    let isError = false;
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
      case "address":
      case "skill":
      case "experience":
      case "mobile":
      case "comments":
      case "companyCode":
      case "companyName":
      case "name":
      case "firstName":
        if (
          (formObj.controls[property].hasError("required") &&
            formObj.controls[property].touched) ||
          formObj.controls[property].hasError("minlength") ||
          formObj.controls[property].hasError("maxlength")
        ) {
          isError = true;
        }
        break;
      case "password":
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
    return isError;
  };
}
