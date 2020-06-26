import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import ObjectUtil from "../../utils/object-utils";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"],
})
export class ContactUsComponent implements OnInit {
  formGroupObject: FormGroup;
  displayTextObj: {};
  constructor(private fb: FormBuilder, private objectUtil: ObjectUtil) {}

  ngOnInit() {
    this.displayTextObj = {
      name: "Name",
      email: "Email",
      comments: "Comments",
      enterName: "Enter name",
      enterEmail: "Enter email",
    };
    this.initializeForm();
  }

  private initializeForm = (): void => {
    this.formGroupObject = this.fb.group({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      comments: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  };

  public onSubmit = (): void => {
    console.log("onSubmit of contacts ", this.formGroupObject.value);
  };

  public onReset = (): void => {
    console.log("onReset of contacts ", this.formGroupObject.value);
  };

  public checkForError = (formObj, property): boolean => {
    return this.objectUtil.checkForFormErrors(formObj, property);
  };
}
