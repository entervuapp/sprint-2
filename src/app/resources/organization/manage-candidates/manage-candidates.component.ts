import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import ObjectUtil from "../../../commons/utils/object-utils";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { ActivatedRoute } from "@angular/router";
import { ManageEventsService } from "../../organization/manage-events/manage-events/manage-events.service";
import { Subscription } from "rxjs";
import {
  ValueDescriptionId,
  SkillAndActive,
} from "../../../commons/typings/typings";
import { ManageCandidateService } from "./manage-candidates/manage-candidate.service";
import { SHARED_CONSTANTS } from "../../../commons/constants/shared.constants";
import { LocalStorageService } from "../../../commons/services/local-storage/local-storage.service";

@Component({
  selector: "app-manage-candidates",
  templateUrl: "./manage-candidates.component.html",
  styleUrls: ["./manage-candidates.component.scss"],
})
export class ManageCandidatesComponent implements OnInit {
  private eventDetails: object;
  private _subscriptions = new Subscription();
  public skillDropDownList: ValueDescriptionId[];
  public myForm: FormGroup;
  private eventId: number;
  public candidatesList: any[];
  public SHARED_CONSTANTS;
  private originalCandidatesList: any[];
  public candidateSearchControl: FormControl;
  public skillTabsList: SkillAndActive[];
  public displayTextObject: object;
  public resetField: boolean;
  private candidateData: object;

  @ViewChild("skillSelect") skillSelect: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    public manageHeaderService: ManageHeaderService,
    private manageEventsService: ManageEventsService,
    private manageCandidateService: ManageCandidateService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.candidateData = {};
    this.resetField = false;
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.candidateSearchControl = new FormControl("");
    this.displayTextObject = {
      name: "Name",
      mobile: "Mobile",
      email: "Email",
      skill: "Skill",
      addCandidate: "Add candidate",
      reset: "Reset",
      add: "Add",
      update: "Update",
      candidateList: "Candidates list",
      edit: "Edit",
      delete: "Delete",
      headerList: ["#", "Name", "Email", "Mobile", "Skill", "Actions"],
    };
    this.originalCandidatesList = [];
    this.eventDetails = {};
    this.skillTabsList = [];
    this.candidatesList = [];
    this._subscriptions.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.eventId = parseInt(params["id"]);
        if (this.eventId) {
          this.getEventDetails(this.eventId);
        }
      })
    );
    this.initializeForm();
    if (this.manageHeaderService) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private initializeForm = (): void => {
    let userDetails = JSON.parse(
      this.localStorageService.get(
        this.SHARED_CONSTANTS.EVU_LOCAL_STORAGES.LS_EVU_USER_DETAILS
      )
    );
    this.myForm = this.fb.group({
      id: new FormControl(null),
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      mobile: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      eventId: new FormControl(this.eventId, []),
      roundId: new FormControl("", []),
      skill: new FormGroup({
        value: new FormControl("", [Validators.required]),
        id: new FormControl("", []),
        description: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
        ]),
      }),
      invitedBy: new FormControl(
        userDetails && userDetails.email ? userDetails.email : "",
        [Validators.required]
      ),
    });
  };

  private getEventDetails = (eventId): void => {
    if (eventId) {
      this._subscriptions.add(
        this.manageEventsService.findEvent(eventId).subscribe(
          (data) => {
            this.eventDetails = { ...data.response };
            this.prepareSkillDropDwon();
            this.onSkillSelect(this.skillDropDownList[0]);
            this.getCandidatesList(this.eventId);
          },
          (errors) => {
            console.log("error", errors);
            if (errors) {
              this.objectUtil.showAlert([
                ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR,
              ]);
            }
          }
        )
      );
    }
  };

  public checkForError(formObj, property: string): boolean {
    return this.objectUtil.checkForFormErrors(formObj, property);
  }

  public onSave = (): void => {
    let requestBody = this.prepareRequestBody({ ...this.myForm.value });
    if (requestBody && requestBody["id"]) {
      this.updateCandidate(requestBody);
    } else {
      this.addCandidate(requestBody);
    }
  };

  private addCandidate = (requestBody): void => {
    this._subscriptions.add(
      this.manageCandidateService.addCandidate(requestBody).subscribe(
        (response) => {
          this.objectUtil.showAlert([
            ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.SUCCESS,
          ]);
          this.getCandidatesList(this.eventId);
          this.onCancel();
        },
        (errors) => {
          console.log("error", errors);
          if (errors) {
            this.objectUtil.showAlert([
              ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR,
            ]);
          }
        }
      )
    );
  };

  private updateCandidate = (requestBody): void => {
    this._subscriptions.add(
      this.manageCandidateService.updateCandidate(requestBody).subscribe(
        (response) => {
          this.objectUtil.showAlert([
            ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.SUCCESS,
          ]);
          this.getCandidatesList(this.eventId);
          this.onCancel();
        },
        (errors) => {
          console.log("error", errors);
          if (errors) {
            this.objectUtil.showAlert([
              ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR,
            ]);
          }
        }
      )
    );
  };

  public onCancel = (): void => {
    this.myForm.reset();
    this.resetField = true;
    setTimeout(() => {
      this.myForm.controls.eventId.setValue(this.eventId);
      this.onSkillSelect();
      this.resetField = false;
    }, 500);
  };

  public onEdit = (candidate): void => {
    const {
      name,
      email,
      mobile,
      skill,
      id,
      eventId,
      roundId,
      invitedBy,
    } = candidate;
    this.myForm.patchValue({
      name,
      email,
      mobile,
      skill,
      id,
      eventId,
      roundId,
      invitedBy,
    });
    this.skillSelect.nativeElement.value = this.myForm.value.skill.value;
  };

  public onDelete = (candidate): void => {
    this._subscriptions.add(
      this.manageCandidateService.deleteEvent(candidate.id).subscribe(
        (response) => {
          this.getCandidatesList(this.eventId);
        },
        (errors) => {
          console.log("error", errors);
          if (errors) {
            this.objectUtil.showAlert([
              ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR,
            ]);
          }
        }
      )
    );
  };

  private prepareSkillDropDwon = (): void => {
    this.skillDropDownList = [];
    if (
      this.eventDetails &&
      this.eventDetails["eventSkills"] &&
      this.eventDetails["eventSkills"].length
    ) {
      this.eventDetails["eventSkills"].forEach((eachSkill, key) => {
        let skillObj = {
          skill: { ...eachSkill.skill },
          active: key === 0 ? true : false,
        };
        this.skillDropDownList.push(skillObj.skill);
        this.skillTabsList.push(skillObj);
      });
    }
  };

  public onSkillTabClick = (skill): void => {
    this.candidateSearchControl.setValue("");
    this.markSkillAsActive(skill);
    this.filterCandidatesForSkill(skill);
  };

  private markSkillAsActive = (activeSkill): void => {
    if (this.skillTabsList && this.skillTabsList.length) {
      this.skillTabsList.forEach((item) => {
        if (
          activeSkill &&
          item.skill &&
          item.skill.value === activeSkill.skill.value
        ) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    }
  };

  private getCandidatesList = (eventId): void => {
    this._subscriptions.add(
      this.manageCandidateService.getCandidates().subscribe(
        (response) => {
          let allCandidatesList = [...response];
          this.originalCandidatesList = allCandidatesList.filter(
            (item) => item.eventId === eventId
          );
          this.filterCandidatesForSkill();
        },
        (errors) => {
          console.log("error", errors);
          if (errors) {
            this.objectUtil.showAlert([
              ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR,
            ]);
          }
        }
      )
    );
  };

  private filterCandidatesForSkill = (activeSkill?): void => {
    if (!activeSkill) {
      activeSkill = this.skillTabsList.find((item) => item.active);
    }
    if (activeSkill && activeSkill.skill && activeSkill.skill.description) {
      this.candidatesList = this.originalCandidatesList.filter(
        (candidate) =>
          candidate.skill.description === activeSkill.skill.description
      );
    }
  };

  public onSkillSelect = (selectedSkill = null): void => {
    if (!selectedSkill) {
      selectedSkill = this.skillDropDownList.find(
        (skill) => skill.value === this.skillSelect.nativeElement.value
      );
    }
    this.myForm.controls.skill.setValue({
      value: selectedSkill["value"],
      id: selectedSkill["id"],
      description: selectedSkill["description"],
    });
  };

  public onCandidateSearch = (): void => {
    let activeSkill = this.skillTabsList.find((item) => item.active);
    if (activeSkill && activeSkill.skill && activeSkill.skill.description) {
      this.candidatesList = this.originalCandidatesList
        .filter(
          (candidate) =>
            candidate.skill.description === activeSkill.skill.description
        )
        .filter(
          (candidate) =>
            candidate.name
              .toLowerCase()
              .indexOf(this.candidateSearchControl.value.toLowerCase()) !==
              -1 ||
            candidate.email
              .toLowerCase()
              .indexOf(this.candidateSearchControl.value.toLowerCase()) !==
              -1 ||
            candidate.mobile
              .toLowerCase()
              .indexOf(this.candidateSearchControl.value.toLowerCase()) !== -1
        );
    }
  };

  public onBlurOfEmail = (event): void => {
    if (
      event &&
      event.target &&
      event.target.value &&
      this.objectUtil.checkEmailValidity(event.target.value)
    ) {
      this._subscriptions.add(
        this.manageCandidateService.findEmail(event.target.value).subscribe(
          (response) => {
            console.log(response);
          },
          (errors) => {
            console.log("error", errors);
            if (errors) {
              this.objectUtil.showAlert([
                ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR,
              ]);
            }
          }
        )
      );
    }
  };

  public onEmailSelect = (userObj): void => {
    if (userObj && userObj.email) {
      const { firstName, mobile, email } = userObj;
      this.candidateData = { ...userObj };
      this.candidateData["candidateId"] = userObj.id;
      this.myForm.controls.firstName.setValue(firstName);
      this.myForm.controls.mobile.setValue(mobile);
      this.myForm.controls.email.setValue(email);
    }
  };

  private prepareRequestBody = (form): object => {
    let request = {
      eventId: form && form.eventId ? form.eventId : null,
      skillId: form && form.skill && form.skill.id ? form.skill.id : null,
      roundId: form && form.roundId ? form.roundId : 1,
      invitedBy: form && form.invitedBy ? form.invitedBy : null,
      candidates: [{ ...this.candidateData }],
    };
    return request;
  };
}
