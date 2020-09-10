import { AppComponent } from "src/app/app.component";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ObjectUtil } from "../../../commons/utils/object-utils";
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
import { UserDetailsService } from "../../../commons/services/user-details/user-details.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmPopupComponent } from "../../../commons/components/modals/confirm-popup/confirm-popup.component";

@Component({
  selector: "app-manage-candidates",
  templateUrl: "./manage-candidates.component.html",
  styleUrls: ["./manage-candidates.component.scss"],
})
export class ManageCandidatesComponent extends AppComponent implements OnInit {
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
  private userDetails: object;

  @ViewChild("skillSelect") skillSelect: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public objectUtil: ObjectUtil,
    public manageHeaderService: ManageHeaderService,
    private manageEventsService: ManageEventsService,
    private manageCandidateService: ManageCandidateService,
    public localStorageService: LocalStorageService,
    public userDetailsService: UserDetailsService,
    private matDialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.candidateData = {};
    this.resetField = false;
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
      invitedCandidates: "Invited candidates",
      edit: "Edit",
      delete: "Delete",
      headerList: [
        "#",
        "Name",
        "Email",
        "Mobile",
        "Experience",
        "Invited by",
        "Actions",
      ],
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
    this.userDetails = this.userDetailsService.get();
    if (!this.userDetails) {
      this.userDetails = this.activatedRoute.snapshot.data["userDetails"];
      this.setUserDetails();
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private initializeForm = (data = null): void => {
    this.myForm = this.fb.group({
      id: new FormControl(data && data.id ? data.id : null),
      firstName: new FormControl(
        data && data["user"] && data["user"].firstName
          ? data["user"].firstName
          : "",
        [Validators.required, Validators.minLength(3)]
      ),
      email: new FormControl(
        data && data["user"] && data["user"].email ? data["user"].email : "",
        [Validators.required, Validators.email]
      ),
      contactNumber: new FormControl(
        data && data["user"] && data["user"].contactNumber
          ? data["user"].contactNumber
          : "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]
      ),
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
          this.onCancel();
          if (this.eventId) {
            this.getEventDetails(this.eventId);
          }
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
      this.manageCandidateService.updateCandidateInEvent(requestBody).subscribe(
        (response) => {
          this.objectUtil.showAlert([
            ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.SUCCESS,
          ]);
          this.onCancel();
          if (this.eventId) {
            this.getEventDetails(this.eventId);
          }
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

  public onEdit = (candidateObj): void => {
    // const {
    //   name,
    //   email,
    //   contactNumber,
    //   skill,
    //   id,
    //   eventId,
    //   roundId,
    // } = candidateObj.candidate.user;
    // this.myForm.patchValue({
    //   name,
    //   email,
    //   contactNumber,
    //   skill,
    //   id,
    //   eventId,
    //   roundId,
    // });
    this.initializeForm({ ...candidateObj.candidate });
    this.skillSelect.nativeElement.value = this.myForm.value.skill.value;
  };

  public onCandidateDelete = (candidateObj): void => {
    const data = { message: "Are you sure?", title: "Confirm?" };
    const dialogRef = this.matDialog.open(ConfirmPopupComponent, {
      data: data,
      disableClose: true,
    });

    dialogRef.keydownEvents().subscribe((e) => {
      if (e && e.keyCode === 27) {
        dialogRef.close();
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "ok") {
        let requestBody = this.prepareRequestForDeleteAndUpdate(
          { ...this.eventDetails },
          candidateObj,
          "DELETE"
        );
        requestBody.candidates.forEach((item) => {
          item["candidateId"] = item["id"];
        });
        this._subscriptions.add(
          this.manageCandidateService
            .deleteCandidateFromEvent(requestBody)
            .subscribe(
              (data) => {
                this.eventDetails = { ...data.response };
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
      }
    });
  };

  private prepareSkillDropDwon = (): void => {
    this.skillDropDownList = [];
    this.skillTabsList = [];
    if (
      this.eventDetails &&
      this.eventDetails["eventSkills"] &&
      this.eventDetails["eventSkills"].length
    ) {
      this.eventDetails["eventSkills"].forEach((eachSkill, key) => {
        let skillObj = {
          skill: { ...eachSkill.skill },
          active: key === 0 ? true : false,
          id: eachSkill.id,
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
      this.manageCandidateService.getCandidatesOfEvent(this.eventId).subscribe(
        (data) => {
          this.originalCandidatesList = [...data.response];
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
    this.candidatesList = [];
    this.originalCandidatesList = [];
    if (!activeSkill) {
      activeSkill = this.skillTabsList.find((item) => item.active);
    }

    if (
      activeSkill &&
      activeSkill.skill &&
      activeSkill.skill.description &&
      this.eventDetails["eventSkills"] &&
      this.eventDetails["eventSkills"].length
    ) {
      for (let i = 0; i < this.eventDetails["eventSkills"].length; i++) {
        if (
          this.eventDetails["eventSkills"][i].skill.id === activeSkill.skill.id
        ) {
          if (
            this.eventDetails["eventSkills"][i].roundDetails &&
            this.eventDetails["eventSkills"][i].roundDetails.length
          ) {
            for (
              let j = 0;
              j < this.eventDetails["eventSkills"][i].roundDetails.length;
              j++
            ) {
              this.originalCandidatesList = [
                ...this.originalCandidatesList,
                ...this.eventDetails["eventSkills"][i].roundDetails[j]
                  .candidates,
              ];
            }
          }
          this.candidatesList = [...this.originalCandidatesList];
          break;
        }
      }
      // this.candidatesList = this.originalCandidatesList.filter(
      //   (candidate) =>
      //     candidate.skill.description === activeSkill.skill.description
      // );
    } else {
      this.candidatesList = [];
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
      this.candidatesList = this.originalCandidatesList.filter(
        (candidateObj) =>
          (candidateObj &&
            candidateObj.candidate &&
            candidateObj.candidate.user &&
            candidateObj.candidate.user.firstName &&
            candidateObj.candidate.user.firstName
              .toLowerCase()
              .indexOf(this.candidateSearchControl.value.toLowerCase()) !==
              -1) ||
          (candidateObj &&
            candidateObj.candidate &&
            candidateObj.candidate.user &&
            candidateObj.candidate.user.email &&
            candidateObj.candidate.user.email
              .toLowerCase()
              .indexOf(this.candidateSearchControl.value.toLowerCase()) !==
              -1) ||
          (candidateObj &&
            candidateObj.candidate &&
            candidateObj.candidate.user &&
            candidateObj.candidate.user.contactNumber &&
            candidateObj.candidate.user.contactNumber.indexOf(
              this.candidateSearchControl.value.toLowerCase()
            ) !== -1) ||
          (candidateObj &&
            candidateObj.candidate &&
            candidateObj.candidate.user &&
            candidateObj.candidate.user.experience &&
            candidateObj.candidate.user.experience.indexOf(
              this.candidateSearchControl.value.toLowerCase()
            ) !== -1) ||
          (candidateObj &&
            candidateObj.invitedBy &&
            candidateObj.invitedBy.firstName &&
            candidateObj.invitedBy.firstName
              .toLowerCase()
              .indexOf(this.candidateSearchControl.value.toLowerCase()) !== -1)
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
    if (userObj && userObj.user && userObj.user.email) {
      const { firstName, contactNumber, email } = userObj.user;
      this.candidateData = { ...userObj };
      this.candidateData["candidateId"] = userObj.id;
      this.myForm.controls.firstName.setValue(firstName);
      this.myForm.controls.contactNumber.setValue(contactNumber);
      this.myForm.controls.email.setValue(email);
    }
  };

  private prepareRequestBody = (form): object => {
    let skillIdAndRoundId = this.getSkillId(form.skill);
    let request = {
      eventId: form && form.eventId ? form.eventId : null,
      skillId:
        skillIdAndRoundId && skillIdAndRoundId["skillId"]
          ? skillIdAndRoundId["skillId"]
          : null,
      roundId:
        skillIdAndRoundId && skillIdAndRoundId["roundId"]
          ? skillIdAndRoundId["roundId"]
          : null,
      candidates: [{ ...this.candidateData }],
    };
    return request;
  };

  private getSkillId = (skill) => {
    let temp = {
      skillId: null,
      roundId: null,
    };
    if (
      this.eventDetails &&
      this.eventDetails["eventSkills"] &&
      this.eventDetails["eventSkills"].length
    ) {
      for (let i = 0; i < this.eventDetails["eventSkills"].length; i++) {
        if (this.eventDetails["eventSkills"][i].skill.id === skill.id) {
          temp.skillId = this.eventDetails["eventSkills"][i].id;
          for (
            let j = 0;
            j < this.eventDetails["eventSkills"][i].roundDetails.length;
            j++
          ) {
            if (
              this.eventDetails["eventSkills"][i].roundDetails[j]
                .roundNumber === "1"
            ) {
              temp.roundId = this.eventDetails["eventSkills"][i].roundDetails[
                j
              ].id;
              break;
            }
          }
          break;
        }
      }
    }
    return temp;
  };

  private prepareRequestForDeleteAndUpdate = (
    eventDetails,
    candidateObj,
    action
  ) => {
    let activeSkill = this.skillTabsList.find(
      (skillObj) => skillObj.active === true
    );
    let roundId = null;
    for (let i = 0; i < eventDetails.eventSkills.length; i++) {
      if (eventDetails.eventSkills[i].id === activeSkill["id"]) {
        for (
          let j = 0;
          j < eventDetails.eventSkills[i].roundDetails.length;
          j++
        ) {
          let isMatched = eventDetails.eventSkills[i].roundDetails[
            j
          ].candidates.filter(
            (roundCandidate) =>
              roundCandidate.candidate.id === candidateObj.candidate.id
          );

          if (isMatched && isMatched.length) {
            roundId = eventDetails.eventSkills[i].roundDetails[j].id;
          }
        }
      }
    }
    let requestBody = {
      eventId: this.eventId,
      skillId: activeSkill["id"],
      roundId: roundId,
      candidates: [
        {
          ...candidateObj.candidate,
        },
      ],
      action: action,
    };
    return requestBody;
  };
}
