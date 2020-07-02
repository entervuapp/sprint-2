import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import ObjectUtil from "../../../commons/utils/object-utils";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { ActivatedRoute } from "@angular/router";
import { ManageEventsService } from "../../organization/manage-events/manage-events/manage-events.service";
import { Subscription } from "rxjs";
import {
  ValueDescription,
  SkillAndActive,
} from "../../../commons/typings/typings";
import { ManageCandidateService } from "./manage-candidates/manage-candidate.service";
import { SHARED_CONSTANTS } from "../../../commons/constants/shared.constants";

@Component({
  selector: "app-manage-candidates",
  templateUrl: "./manage-candidates.component.html",
  styleUrls: ["./manage-candidates.component.scss"],
})
export class ManageCandidatesComponent implements OnInit {
  eventDetails;
  private _subscriptions = new Subscription();
  skillDropDownList: ValueDescription[];
  myForm: FormGroup;
  eventId: number;
  candidatesList: any[];
  public SHARED_CONSTANTS;
  originalCandidatesList: any[];
  public candidateSearchControl: FormControl;
  public skillTabsList: SkillAndActive[];
  FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  fontIcon = FONT_AWESOME_ICONS_CONSTANTS;
  public displayTextObject: object;

  @ViewChild("skillSelect") skillSelect: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    public manageHeaderService: ManageHeaderService,
    private manageEventsService: ManageEventsService,
    private manageCandidateService: ManageCandidateService
  ) {}

  ngOnInit() {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.candidateSearchControl = new FormControl("");
    this.displayTextObject = {
      name: "Name",
      mobile: "Mobile",
      email: "Email",
      skill: "Skill",
      addCandidate: "Add candidate",
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

  private initializeForm = () => {
    this.myForm = this.fb.group({
      id: new FormControl(null),
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      mobile: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      eventId: new FormControl(this.eventId, []),
      inRound: new FormControl("", []),
      skill: new FormGroup({
        value: new FormControl("", [Validators.required]),
        description: new FormControl("", [
          Validators.required,
          Validators.minLength(2),
        ]),
      }),
      invitedBy: new FormControl("", []),
    });
  };

  private getEventDetails = (eventId) => {
    if (eventId) {
      this._subscriptions.add(
        this.manageEventsService.findEvent(eventId).subscribe(
          (response) => {
            this.eventDetails = { ...response };
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

  checkForError(formObj, property) {
    return this.objectUtil.checkForFormErrors(formObj, property);
  }

  public onSave = (): void => {
    let requestBody = { ...this.myForm.value };
    if (requestBody && requestBody.id) {
      this.updateCandidate(requestBody);
    } else {
      requestBody.inRound = 1;
      this.addCandidate(requestBody);
    }
  };

  private addCandidate = (requestBody) => {
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

  private updateCandidate = (requestBody) => {
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

  public onCancel = () => {
    this.myForm.reset();
    setTimeout(() => {
      this.myForm.controls.eventId.setValue(this.eventId);
      this.onSkillSelect();
    }, 500);
  };

  onEdit = (candidate) => {
    const {
      name,
      email,
      mobile,
      skill,
      id,
      eventId,
      inRound,
      invitedBy,
    } = candidate;
    this.myForm.patchValue({
      name,
      email,
      mobile,
      skill,
      id,
      eventId,
      inRound,
      invitedBy,
    });
    this.skillSelect.nativeElement.value = this.myForm.value.skill.value;
  };

  onDelete = (candidate) => {
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

  private prepareSkillDropDwon = () => {
    this.skillDropDownList = [];
    if (
      this.eventDetails &&
      this.eventDetails.skillsList &&
      this.eventDetails.skillsList.length
    ) {
      this.eventDetails.skillsList.forEach((eachSkill, key) => {
        let skillObj = {
          skill: {
            description: eachSkill.skill.description,
            value: eachSkill.skill.value,
          },
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

  private filterCandidatesForSkill = (activeSkill?) => {
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

  public onSkillSelect = (selectedSkill = null) => {
    if (!selectedSkill) {
      selectedSkill = this.skillDropDownList.find(
        (skill) => skill.value === this.skillSelect.nativeElement.value
      );
    }
    this.myForm.controls.skill.setValue({
      value: selectedSkill["value"],
      description: selectedSkill["description"],
    });
  };

  public onCandidateSearch = () => {
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
}
