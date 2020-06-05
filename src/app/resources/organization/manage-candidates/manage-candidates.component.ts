import { Component, OnInit } from "@angular/core";
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
import { Alerts } from "../../../commons/typings/typings";
import { ManageCandidateService } from "./manage-candidates/manage-candidate.service";

@Component({
  selector: "app-manage-candidates",
  templateUrl: "./manage-candidates.component.html",
  styleUrls: ["./manage-candidates.component.scss"],
})
export class ManageCandidatesComponent implements OnInit {
  eventDetails;
  alerts: Alerts[];
  private _subscriptions = new Subscription();
  skillDropDownList: any[];
  myForm: FormGroup;
  eventId: number;
  candidatesList: any[];
  originalCandidatesList: any[];
  skillTabsList: any[];
  FONT_AWESOME_ICONS_CONSTANTS = FONT_AWESOME_ICONS_CONSTANTS;
  fontIcon = FONT_AWESOME_ICONS_CONSTANTS;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private objectUtil: ObjectUtil,
    public manageHeaderService: ManageHeaderService,
    private manageEventsService: ManageEventsService,
    private manageCandidateService: ManageCandidateService
  ) {}

  ngOnInit() {
    this.originalCandidatesList = [];
    this.eventDetails = {};
    this.skillTabsList = [
      { code: "UI", description: "UI", active: false },
      { code: "JAVA", description: "Java", active: true },
      { code: "DOT_NET", description: "Dot Net", active: false },
    ];
    this.candidatesList = [];
    this._subscriptions.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.eventId = parseInt(params["id"]);
        if (this.eventId) {
          this.getEventDetails(this.eventId);
          this.getCandidatesList(this.eventId);
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
      skill: new FormControl("", [Validators.required]),
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
          },
          (errors) => {
            console.log("error", errors);
            if (errors) {
              this.alerts = [{ code: "ERROR", systemMessage: errors }];
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
      this.addCandidate(requestBody);
    }
  };

  private addCandidate = (requestBody) => {
    this._subscriptions.add(
      this.manageCandidateService.addCandidate(requestBody).subscribe(
        (response) => {
          this.alerts = [
            { code: "SUCCESS", systemMessage: "Created successfully." },
          ];
          this.getCandidatesList(this.eventId);
          this.onCancel();
        },
        (errors) => {
          console.log("error", errors);
          if (errors) {
            this.alerts = [{ code: "ERROR", systemMessage: errors }];
          }
        }
      )
    );
  };

  private updateCandidate = (requestBody) => {
    this._subscriptions.add(
      this.manageCandidateService.updateCandidate(requestBody).subscribe(
        (response) => {
          this.alerts = [
            { code: "SUCCESS", systemMessage: "Updated successfully." },
          ];
          this.getCandidatesList(this.eventId);
          this.onCancel();
        },
        (errors) => {
          console.log("error", errors);
          if (errors) {
            this.alerts = [{ code: "ERROR", systemMessage: errors }];
          }
        }
      )
    );
  };

  public onCancel = () => {
    this.myForm.reset();
    console.log(this.myForm);
  };

  onEdit = (candidate) => {
    const { name, email, mobile, skill, id, eventId, invitedBy } = candidate;
    this.myForm.patchValue({
      name,
      email,
      mobile,
      skill,
      id,
      eventId,
      invitedBy,
    });
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
            this.alerts = [{ code: "ERROR", systemMessage: errors }];
          }
        }
      )
    );
  };

  onTabClick = (skill) => {
    this.skillTabsList.forEach((item) => {
      if (skill.code === item.code) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
  };

  private prepareSkillDropDwon = () => {
    this.skillDropDownList = [];
    if (
      this.eventDetails &&
      this.eventDetails.skillsList &&
      this.eventDetails.skillsList.length
    ) {
      this.eventDetails.skillsList.forEach((skill, key) => {
        let skillObj = {
          skillName: skill.skillName,
          active: false,
        };
        this.skillDropDownList.push(skillObj);
      });
    }
    setTimeout(() => {
      if (this.skillDropDownList && this.skillDropDownList.length) {
        this.skillDropDownList[0].active = true;
      }
    }, 500);
  };

  public onSkillTabClick = (skill): void => {
    this.filterCandidatesForSkill(skill.skillName);
  };

  private getCandidatesList = (eventId): void => {
    this._subscriptions.add(
      this.manageCandidateService.getCandidates().subscribe(
        (response) => {
          let allCandidatesList = [...response];
          this.originalCandidatesList = allCandidatesList.filter(
            (item) => item.eventId === eventId
          );
          this.filterCandidatesForSkill(this.skillDropDownList[0]);
        },
        (errors) => {
          console.log("error", errors);
          if (errors) {
            this.alerts = [{ code: "ERROR", systemMessage: errors }];
          }
        }
      )
    );
  };

  private filterCandidatesForSkill = (skill) => {
    this.candidatesList = this.originalCandidatesList.filter(
      (candidate) => candidate.skill === skill
    );
  };
}
