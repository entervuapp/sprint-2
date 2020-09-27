import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
  AbstractControl,
} from "@angular/forms";
import { ObjectUtil } from "../../../commons/utils/object-utils";
import { ManageEventsService } from "./manage-events/manage-events.service";
import {
  ValueDescriptionId,
  SkillAndRound,
} from "../../../commons/typings/typings";
import FONT_AWESOME_ICONS_CONSTANTS from "../../../commons/constants/font-awesome-icons";
import { AppComponent } from "src/app/app.component";
import { Router, ActivatedRoute } from "@angular/router";
import { ROUTE_URL_PATH_CONSTANTS } from "../../../commons/constants/route-url-path.constants";
import { Subscription } from "rxjs";
import { ManageSkillsService } from "../../admin/manage-skills/manage-skills/manage-skills.service";
import { SHARED_CONSTANTS } from "../../../commons/constants/shared.constants";
import { LocalStorageService } from "../../../commons/services/local-storage/local-storage.service";
import { ManageHeaderService } from "../../../commons/services/manage-header/manage-header.service";
import { UserDetailsService } from "../../../commons/services/user-details/user-details.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmPopupComponent } from "../../../commons/components/modals/confirm-popup/confirm-popup.component";

@Component({
  selector: "app-manage-events",
  templateUrl: "./manage-events.component.html",
  styleUrls: ["./manage-events.component.scss"],
})
export class ManageEventsComponent extends AppComponent implements OnInit {
  resetField: boolean;
  ROUTE_URL_PATH_CONSTANTS;
  eventsList: any[];
  private _subscriptions = new Subscription();
  formGroupObject: FormGroup;
  public displayTextObject: object;
  skillsList: SkillAndRound[];
  skillOptionsList: ValueDescriptionId[];
  filteredSkillOptionsList: ValueDescriptionId[];
  fontIcon = FONT_AWESOME_ICONS_CONSTANTS;
  mininumEventDate: string;
  renderSkillId: number;
  skillObjForPopup: object;
  public SHARED_CONSTANTS;
  public newRoundNames: string[];
  public editedSkillRoundDetails = [];
  public userDetails: object;
  public roundsDetailsFormSubmitted: boolean;
  public addEventMobileVarible: boolean;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    public objectUtil: ObjectUtil,
    public manageEventsService: ManageEventsService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private manageSkillsService: ManageSkillsService,
    public localStorageService: LocalStorageService,
    public manageHeaderService: ManageHeaderService,
    public userDetailsService: UserDetailsService,
    private matDialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.roundsDetailsFormSubmitted = false;
    this.userDetails = null;
    this.newRoundNames = [];
    this.SHARED_CONSTANTS = SHARED_CONSTANTS;
    this.skillObjForPopup = {};
    this.mininumEventDate = this.stringDateFormat();
    this.ROUTE_URL_PATH_CONSTANTS = ROUTE_URL_PATH_CONSTANTS;
    this.eventsList = [];
    this.displayTextObject = {
      roundDetailsMissing: "Please add round details",
      fewRoundDetailsMissing: "Few round details are missing",
      createEvent: "Create event",
      name: "Name",
      eventDate: "Date",
      eventTime: "Time",
      skill: "Skill",
      numberOfRounds: "Number of rounds",
      addEvent: "Add event",
      events: "Events",
      addMembers: "Add members+",
      viewEvent: "View event",
      offeredMembers: "Offered members",
      addRoundDetails: "Add Round Details",
      round: "Round",
      submit: "Submit",
      options: "Options",
      previousOptions: "Previous Options",
    };
    this.resetField = false;
    this.addEventMobileVarible = false;
    this.getSkillOptions();
    this.initializeForm();
    if (
      this.manageHeaderService &&
      this.manageHeaderService.updateHeaderVisibility
    ) {
      this.manageHeaderService.updateHeaderVisibility(true);
    }
    this.userDetails = this.userDetailsService.get();
    if (!this.userDetails) {
      this.userDetails = this.activatedRoute.snapshot.data["userDetails"];
      this.setUserDetails();
    }
    this.getEventsList();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private initializeForm = (formData?) => {
    if (formData) {
      this.formGroupObject = this.fb.group({
        id: new FormControl(formData && formData.id ? formData.id : null),
        createdBy: new FormControl(
          formData && formData.createdBy ? formData.createdBy : ""
        ),
        creationDate: new FormControl(
          formData && formData.creationDate ? formData.creationDate : ""
        ),
        name: new FormControl(
          formData && formData.eventName ? formData.eventName : "",
          {
            validators: [Validators.required, Validators.minLength(3)],
            updateOn: "blur",
          }
        ),
        eventDate: new FormControl(
          formData && formData.eventDate ? formData.eventDate : "",
          [Validators.required]
        ),
        eventTime: new FormControl(
          formData && formData.eventTime ? formData.eventTime : "",
          [Validators.required]
        ),
        skill: new FormGroup({
          value: new FormControl("", []),
          id: new FormControl("", []),
          description: new FormControl("", []),
        }),
        numberOfRounds: new FormControl("", {
          validators: [Validators.min(1)],
          updateOn: "blur",
        }),
      });
      // this.skillsList =
      //   formData && formData.eventSkills && formData.eventSkills.length > 0
      //     ? formData.eventSkills
      //     : [];
    } else {
      this.formGroupObject = this.fb.group({
        id: new FormControl(null),
        createdBy: new FormControl(""),
        creationDate: new FormControl(""),
        name: new FormControl("", {
          validators: [Validators.required, Validators.minLength(3)],
          updateOn: "blur",
        }),
        eventDate: new FormControl("", [Validators.required]),
        eventTime: new FormControl("", [Validators.required]),
        skill: new FormGroup({
          value: new FormControl("", [Validators.required]),
          id: new FormControl("", []),
          description: new FormControl("", {
            validators: [Validators.required, Validators.minLength(2)],
            updateOn: "blur",
          }),
        }),
        numberOfRounds: new FormControl("", {
          validators: [Validators.required, Validators.min(1)],
          updateOn: "blur",
        }),
      });
      this.skillsList = [];
    }
  };

  onSave = () => {
    if (
      this.formGroupObject.controls.skill["controls"].value.value &&
      this.formGroupObject.controls.numberOfRounds.value
    ) {
      this.addNewSkill();
    }

    let requestBody = {
      id:
        this.formGroupObject &&
        this.formGroupObject.value &&
        this.formGroupObject.value.id
          ? this.formGroupObject.value.id
          : null,
      eventName: this.formGroupObject.value.name,
      eventDate: this.formGroupObject.value.eventDate,
      eventTime: this.formGroupObject.value.eventTime,
      createdBy: this.getUserData("email"),
      companyCode: this.getUserData("companyCode"),
      eventSkills: this.prepareSkillList(
        [...this.skillsList],
        this.formGroupObject
      ),
    };

    if (
      requestBody &&
      requestBody.id !== null &&
      requestBody.id !== undefined
    ) {
      this.updateEvent(requestBody);
    } else {
      this.createEvent(requestBody);
    }
  };

  onReset = () => {
    this.resetField = true;
    this.initializeForm();
    this.formGroupDirective.resetForm();
    // setTimeout(() => this.formGroupDirective.resetForm(), 0);
    setTimeout(() => {
      this.resetField = false;
    }, 500);
  };

  private updateEvent = (requestBody) => {
    this._subscriptions.add(
      this.manageEventsService.updateEvent(requestBody).subscribe(
        (response) => {
          this.getEventsList();
          this.objectUtil.showAlert([
            ...this.SHARED_CONSTANTS.SERVICE_MESSAGES.SUCCESS,
          ]);
          this.clearSkillFields();
          this.onReset();
        },
        (errors) => {
          console.log(errors);
        }
      )
    );
  };

  private createEvent = (requestBody) => {
    this._subscriptions.add(
      this.manageEventsService.createEvent(requestBody).subscribe(
        (response) => {
          this.getEventsList();
          this.clearSkillFields();
          this.onReset();
          this.objectUtil.showAlert(
            this.SHARED_CONSTANTS.SERVICE_MESSAGES.SUCCESS
          );
        },
        (errors) => {
          console.log(errors);
          if (errors) {
            this.objectUtil.showAlert(
              this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR
            );
          }
        }
      )
    );
  };

  checkForError(formObj, property) {
    return this.objectUtil.checkForFormErrors(formObj, property);
  }

  public onTimeChange = (event): void => {
    if (event) {
      this.formGroupObject["controls"]["eventTime"].setValue(event);
    } else {
      this.formGroupObject["controls"]["eventTime"].setValue("");
    }
  };

  addNewSkill = () => {
    if (
      this.formGroupObject.controls.skill["controls"].value.value &&
      this.formGroupObject.controls.numberOfRounds.value
    ) {
      let eachSkill;
      if (this.renderSkillId) {
        eachSkill = {
          id: this.renderSkillId,
          skill: {
            value: this.formGroupObject.controls.skill["controls"].value.value,
            description: this.formGroupObject.controls.skill["controls"]
              .description.value,
            id: this.formGroupObject.controls.skill["controls"].id.value,
          },
          numberOfRounds: this.formGroupObject.controls.numberOfRounds.value,
          roundDetailsList: this.assignRoundDetails(),
        };
      } else {
        eachSkill = {
          id: this.skillsList.length + 1,
          skill: {
            value: this.formGroupObject.controls.skill["controls"].value.value,
            description: this.formGroupObject.controls.skill["controls"]
              .description.value,
            id: this.formGroupObject.controls.skill["controls"].id.value,
          },
          numberOfRounds: this.formGroupObject.controls.numberOfRounds.value,
          roundDetailsList: [],
        };
      }
      // this.objectUtil.showAlert([
      //   { code: "SUCCESS", systemMessage: "Success" },
      // ]);
      this.renderSkillId
        ? this.skillsList.splice(this.renderSkillId - 1, 1, eachSkill)
        : this.skillsList.push(eachSkill);
      this.clearSkillFields();
      this.onChangeOfRounds(null);
      this.onSkillChange();
      this.renderSkillId = null;
    } else {
      this.formGroupObject.controls.skill[
        "controls"
      ].description.markAsTouched({ onlySelf: true });
      this.formGroupObject.controls.numberOfRounds.markAsTouched({
        onlySelf: true,
      });
    }
  };

  private clearSkillFields = () => {
    this.formGroupObject.controls.skill.setValue({
      value: "",
      id: "",
      description: "",
    });
    this.formGroupObject.controls.skill.markAsUntouched();
    this.formGroupObject.controls.skill.markAsPristine();
    this.formGroupObject.controls.numberOfRounds.setValue("");
    this.formGroupObject.controls.numberOfRounds.markAsPristine();
    this.formGroupObject.controls.numberOfRounds.markAsUntouched();
  };

  public removeSkill = (idx) => {
    this.skillsList.splice(idx, 1);
  };

  public onSkillEdit = (skillObj): void => {
    this.formGroupObject.controls.skill.setValue({
      id: skillObj.skill.id,
      value: skillObj.skill.value,
      description: skillObj.skill.description,
    });
    this.formGroupObject.controls.numberOfRounds.setValue(
      skillObj.numberOfRounds
    );
    this.editedSkillRoundDetails = skillObj.roundDetailsList;
    this.renderSkillId = skillObj.id;
  };

  public onEditOfEvent = (event) => {
    let requestBody = event && event.id ? event.id : null;
    this._subscriptions.add(
      this.manageEventsService.findEvent(requestBody).subscribe((data) => {
        console.log(data.response);
        if (data && data.response) {
          this.skillsList = this.reverseSkillsFormat({ ...data.response });
          this.initializeForm({ ...data.response });
        }
      })
    );
  };

  public reverseSkillsFormat = (response) => {
    let skillList = [];
    let list =
      response && response.eventSkills && response.eventSkills.length > 0
        ? response.eventSkills
        : [];
    if (list && list.length > 0) {
      list.map((skillObj) => {
        let eachSkill = {
          id: skillObj.id,
          skill: skillObj.skill,
          numberOfRounds: skillObj.rounds,
          roundDetailsList: skillObj.roundDetails,
        };
        skillList.push(eachSkill);
      });
    }
    return skillList;
  };

  public onDeleteOfEvent = (event) => {
    const data = {
      message: "Are you sure you want to delete?",
      title: "Confirmation.",
    };
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
        if (event && event.id !== null && event.id !== undefined) {
          let requestBody = {
            eventId: event && event.id ? event.id : null,
          };
          this._subscriptions.add(
            this.manageEventsService.deleteEvent(requestBody).subscribe(
              (response) => {
                this.getEventsList();
              },
              (errors) => {
                console.log(errors);
              }
            )
          );
        }
      }
    });
  };

  public validateSkillSubmit = (type = null) => {
    if (
      this.formGroupObject.controls.skill["controls"].value.value &&
      this.formGroupObject.controls.numberOfRounds.value
    ) {
      return true;
    } else if (
      this.formGroupObject.controls.skill["controls"].value.value === "" &&
      this.formGroupObject.controls.numberOfRounds.value === ""
    ) {
      if (type === "save") {
        return true;
      } else {
        return false;
      }
    } else if (
      this.formGroupObject.controls.skill["controls"].value.value === "" ||
      this.formGroupObject.controls.numberOfRounds.value === ""
    ) {
      this.formGroupObject.controls.skill[
        "controls"
      ].description.markAsTouched({ onlySelf: true });
      this.formGroupObject.controls.numberOfRounds.markAsTouched({
        onlySelf: true,
      });

      this.formGroupObject.controls.skill["controls"].value.value === ""
        ? this.formGroupObject.controls.skill["controls"].description.setErrors(
            {
              required: true,
            }
          )
        : "";
      this.formGroupObject.controls.numberOfRounds.value === ""
        ? this.formGroupObject.controls.numberOfRounds.setErrors({
            required: true,
          })
        : "";
      return false;
    }
  };

  private getEventsList = () => {
    let requestBody = this.userDetails["organization"]["companyCode"];
    this._subscriptions.add(
      this.manageEventsService.getEvents(requestBody).subscribe(
        (data) => {
          if (data && data["response"] && data["response"].length) {
            this.eventsList = data["response"];
          } else {
            this.eventsList = [];
          }
        },
        (errors) => {
          console.log("errors", errors);
          this.objectUtil.showAlert(
            this.SHARED_CONSTANTS.SERVICE_MESSAGES.ERROR
          );
        }
      )
    );
  };

  public prepareSkillsForDisplay = (event, isTooltip = false) => {
    let skillList = [];
    if (event && event.eventSkills && event.eventSkills.length) {
      event.eventSkills.map((item) =>
        skillList.push(this.fetchSkillName(item.skill.id))
      );
    }
    let displayText = skillList.join(", ");
    if (displayText && displayText.length > 20) {
      return isTooltip
        ? displayText
        : (displayText = `${displayText.substr(0, 20)} ...`);
    } else {
      return displayText;
    }
  };

  public navigateToScreen = (screen, event?) => {
    this.objectUtil.showAlert([]);
    if (screen && event) {
      let queryParam = { id: event.id };
      this.navigateTo(screen, queryParam);
    } else if (screen) {
      this.navigateTo(screen);
    }
  };

  private stringDateFormat = (givenDate = null) => {
    let newDate;
    if (givenDate) {
      newDate = new Date(givenDate);
    } else {
      newDate = new Date();
    }

    let year = newDate.getFullYear();
    let month =
      parseInt(newDate.getMonth()) + 1 < 10
        ? "0" + (parseInt(newDate.getMonth()) + 1)
        : parseInt(newDate.getMonth()) + 1;
    let date =
      newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();

    return year + "-" + month + "-" + date;
  };

  public onSkillSelect = (data) => {
    if (data) {
      let temp = { ...data };
      this.formGroupObject.controls.skill.setValue({
        value: temp.value,
        description: temp.description,
      });
    }
  };

  public isSkillRequired = (): boolean => {
    let validators = this.formGroupObject.controls.skill[
      "controls"
    ].description.validator({} as AbstractControl);
    return validators && validators.required ? true : false;
  };

  private getSkillOptions = () => {
    this._subscriptions.add(
      this.manageSkillsService.getSkills().subscribe(
        (data) => {
          this.skillOptionsList = [...data.response];
          this.filteredSkillOptionsList = [];
        },
        (errors) => {
          if (errors) {
            console.log(errors);
          }
        }
      )
    );
  };

  public onSkillOptionSelect = (skill: ValueDescriptionId): void => {
    if (skill) {
      let isSkillAdded =
        this.skillsList &&
        this.skillsList.length &&
        this.skillsList.filter(
          (eachSkill) => eachSkill.skill["value"] === skill.value
        );
      if (isSkillAdded && isSkillAdded.length) {
        this.formGroupObject.controls.skill["controls"].description.setErrors({
          duplicate: true,
        });
        this.filteredSkillOptionsList = [];
        this.checkForError(this.formGroupObject, "skill");
      } else {
        this.formGroupObject.controls.skill.setValue({
          value: skill.value,
          id: skill.id,
          description: skill.description,
        });
        this.filteredSkillOptionsList = [];
      }
    }
  };

  public onSkillChange = (event = null): void => {
    if (event && event.currentTarget && event.currentTarget.value) {
      this.formGroupObject.controls.skill["controls"].description.setValue(
        event.currentTarget.value
      );
    }
    if (
      this.formGroupObject.controls.skill["controls"].description.value ||
      this.formGroupObject.controls.numberOfRounds.value ||
      this.skillsList.length === 0
    ) {
      this.formGroupObject.controls.skill[
        "controls"
      ].description.setValidators([
        Validators.required,
        Validators.minLength(2),
      ]);
      this.formGroupObject.controls.numberOfRounds.setValidators([
        Validators.required,
        Validators.min(1),
      ]);
    } else {
      this.formGroupObject.controls.skill["controls"].description.setValidators(
        []
      );
      this.formGroupObject.controls.skill["controls"].description.setErrors(
        null
      );
      this.formGroupObject.controls.skill["controls"].value.setValidators([]);
      this.formGroupObject.controls.skill["controls"].value.setErrors(null);
      this.formGroupObject.controls.numberOfRounds.setValidators([
        Validators.min(1),
      ]);
      this.formGroupObject.controls.numberOfRounds.setErrors(null);
    }
    if (
      this.formGroupObject.controls.skill["controls"].description.value &&
      this.formGroupObject.controls.skill["controls"].description.value
        .length &&
      this.formGroupObject.controls.skill["controls"].description.value.length >
        2
    ) {
      this.filteredSkillOptionsList = this.skillOptionsList.filter(
        (skill) =>
          skill.description
            .toLowerCase()
            .indexOf(
              this.formGroupObject.controls.skill[
                "controls"
              ].description.value.toLowerCase()
            ) !== -1
      );
    } else {
      this.filteredSkillOptionsList = [];
    }
  };

  public onChangeOfRounds = (event) => {
    if (event) {
      this.formGroupObject["controls"]["numberOfRounds"].setValue(
        parseInt(event)
      );
    } else {
      this.formGroupObject["controls"]["numberOfRounds"].setValue("");
    }

    if (
      this.formGroupObject.controls.numberOfRounds.value ||
      this.formGroupObject.controls.skill["controls"].description.value ||
      this.skillsList.length === 0
    ) {
      this.formGroupObject.controls.skill[
        "controls"
      ].description.setValidators([
        Validators.required,
        Validators.minLength(2),
      ]);
      this.formGroupObject.controls.numberOfRounds.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]);
    } else {
      this.formGroupObject.controls.skill["controls"].description.setValidators(
        []
      );
      this.formGroupObject.controls.skill["controls"].description.setErrors(
        null
      );
      this.formGroupObject.controls.skill["controls"].value.setValidators([]);
      this.formGroupObject.controls.skill["controls"].value.setErrors(null);
      this.formGroupObject.controls.numberOfRounds.setValidators([
        Validators.min(1),
      ]);
      this.formGroupObject.controls.numberOfRounds.setErrors(null);
    }
  };

  public onClickOfNumberOfRounds = (skillObj): void => {
    this.roundsDetailsFormSubmitted = false;
    this.skillObjForPopup = {};
    this.skillObjForPopup = JSON.parse(JSON.stringify(skillObj));
    if (
      this.skillObjForPopup &&
      this.skillObjForPopup["roundDetailsList"] &&
      this.skillObjForPopup["roundDetailsList"].length === 0
    ) {
      for (let i = 0; i < this.skillObjForPopup["numberOfRounds"]; i++) {
        let temp = {
          id: i + 1,
          roundName: "",
          roundNumber: i + 1,
        };
        this.skillObjForPopup["roundDetailsList"].push(temp);
      }
    }
  };

  public onRoundNameSuggestion = (roundName: string) => {
    if (
      this.skillObjForPopup &&
      this.skillObjForPopup["roundDetailsList"] &&
      this.skillObjForPopup["roundDetailsList"].length &&
      roundName
    ) {
      for (
        let i = 0;
        i < this.skillObjForPopup["roundDetailsList"].length;
        i++
      ) {
        if (this.skillObjForPopup["roundDetailsList"][i].roundName === "") {
          this.skillObjForPopup["roundDetailsList"][i].roundName = roundName;
          break;
        }
      }
    }
  };

  public onRoundNameBlur = (event, skill): void => {
    if (skill && event && event.target && event.target.value) {
      skill.roundName = event.target.value;
      if (this.newRoundNames.indexOf(event.target.value) === -1) {
        this.newRoundNames.push(event.target.value);
      }
    }
  };

  public onRoundNamesSubmit = () => {
    if (this.skillsList && this.skillsList.length) {
      for (let i = 0; i < this.skillsList.length; i++) {
        if (
          this.skillsList[i].skill.value ===
          this.skillObjForPopup["skill"].value
        ) {
          this.skillsList[i]["roundDetailsList"] = this.skillObjForPopup[
            "roundDetailsList"
          ];
        }
      }
    }
    this.skillObjForPopup = {};
    this.roundsDetailsFormSubmitted = false;
    let elem2: HTMLElement = document.querySelector(
      "#addRoundsPopup .close"
    ) as HTMLElement;
    elem2.click();
  };

  public displaySkills = (idx, tooltip = false): string => {
    let displayText = "";
    this.skillsList[idx]["roundDetailsList"].forEach((item) => {
      displayText =
        displayText && displayText.length > 0
          ? `${displayText} ${item.roundName ? ", " + item.roundName : ""}`
          : `${item.roundName}`;
    });
    if (displayText && displayText.length > 10 && tooltip === false) {
      displayText = `${displayText.substr(0, 10)} ...`;
    }
    return displayText;
  };

  private getUserData = (expectedField): string => {
    if (expectedField === "email") {
      return this.userDetails &&
        this.userDetails["user"] &&
        this.userDetails["user"]["email"]
        ? this.userDetails["user"]["email"]
        : null;
    } else if (expectedField === "companyCode") {
      return this.userDetails && this.userDetails["organization"]["companyCode"]
        ? this.userDetails["organization"]["companyCode"]
        : null;
    }
  };

  private prepareSkillList = (list, formGroupObject) => {
    let skillList = [];
    if (list && list.length > 0) {
      let temp = {};
      list.map((skillObj) => {
        if (
          formGroupObject &&
          formGroupObject.value &&
          formGroupObject.value.id
        ) {
          temp = {
            id: skillObj.id,
            skill: skillObj.skill,
            rounds: skillObj.numberOfRounds,
            eventRoundDetails: skillObj.roundDetailsList,
          };
        } else {
          temp = {
            id: null,
            skill: skillObj.skill,
            rounds: skillObj.numberOfRounds,
            eventRoundDetails: skillObj.roundDetailsList,
          };
          if (
            temp &&
            temp["eventRoundDetails"] &&
            temp["eventRoundDetails"].length
          ) {
            temp["eventRoundDetails"].forEach((element) => {
              delete element.id;
            });
          }
        }
        skillList.push(temp);
      });
    }
    return skillList;
  };

  private assignRoundDetails = () => {
    if (
      this.formGroupObject.controls.numberOfRounds.value <
      this.editedSkillRoundDetails.length
    ) {
      return this.editedSkillRoundDetails.splice(
        0,
        this.formGroupObject.controls.numberOfRounds.value
      );
    } else if (
      this.formGroupObject.controls.numberOfRounds.value ===
      this.editedSkillRoundDetails.length
    ) {
      return this.editedSkillRoundDetails;
    } else if (
      this.formGroupObject.controls.numberOfRounds.value >
      this.editedSkillRoundDetails.length
    ) {
      for (
        let i = this.editedSkillRoundDetails.length;
        i < this.formGroupObject.controls.numberOfRounds.value;
        i++
      ) {
        let temp = {
          roundName: "",
          roundId: i,
        };
        this.editedSkillRoundDetails.push(temp);
      }
      return this.editedSkillRoundDetails;
    }
  };

  private fetchSkillName = (id): string => {
    if (id && this.skillOptionsList && this.skillOptionsList.length) {
      let skillObj = this.skillOptionsList.find((skill) => skill.id === id);
      return skillObj.description;
    }
  };

  public checkForRoundDetailsValidity = (): boolean => {
    let isValid = true;
    this.skillsList.map((eachSkill) => {
      if (
        eachSkill &&
        eachSkill["roundDetailsList"] &&
        eachSkill["roundDetailsList"].length === 0
      ) {
        isValid = false;
      }
    });
    return isValid;
  };
}
