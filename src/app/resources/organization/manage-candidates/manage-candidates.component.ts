import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import ObjectUtil from "../../../commons/utils/object-utils";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";

@Component({
  selector: "app-manage-candidates",
  templateUrl: "./manage-candidates.component.html",
  styleUrls: ["./manage-candidates.component.scss"]
})
export class ManageCandidatesComponent implements OnInit {
  myForm: FormGroup;
  candidatesList: any[];
  skillTabsList: any[];
  FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  fontIcon = FONT_AWESOME_ICONS_CONSTANTS;
  constructor(private fb: FormBuilder, private objectUtil: ObjectUtil) {}

  ngOnInit() {
    this.skillTabsList = [
      { code: "UI", description: "UI", active: false },
      { code: "JAVA", description: "Java", active: true },
      { code: "DOT_NET", description: "Dot Net", active: false }
    ];
    this.candidatesList = [
      {
        id: "1",
        name: "Awa",
        email: "awa@g.com",
        mobile: "9999999999",
        skill: "UI"
      }
    ];
    this.myForm = this.fb.group({
      id: new FormControl(null),
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      mobile: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      skill: new FormControl("", [Validators.required])
    });
  }

  checkForError(formObj, property) {
    return this.objectUtil.checkForFormErrors(formObj, property);
  }

  onSave = () => {
    this.candidatesList.push({ ...this.myForm.value });
  };

  onCancel = () => {
    this.myForm.reset();
    console.log(this.myForm);
  };

  onEdit = candidate => {
    const { name, email, mobile, skill, id } = candidate;
    this.myForm.patchValue({ name, email, mobile, skill, id });
  };

  onDelete = idx => {
    this.candidatesList.splice(idx, 1);
  };

  onTabClick = skill => {
    this.skillTabsList.forEach(item => {
      if (skill.code === item.code) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
  };
}
