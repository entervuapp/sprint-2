import { Component, OnInit, Input, Inject } from "@angular/core";
import { NewAny } from "src/app/commons/typings/typings";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-confirm-popup",
  templateUrl: "./confirm-popup.component.html",
  styleUrls: ["./confirm-popup.component.scss"],
})
export class ConfirmPopupComponent implements OnInit {
  public displayTextObject: NewAny;
  @Input() showModalPopup: boolean;

  constructor(
    public dialogRef: MatDialogRef<ConfirmPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.displayTextObject = {
      heading: "Confirm",
      message: "Are you sure?",
      cancel: "Cancel",
      ok: "Ok",
    };
  }

  public onSave = (): void => {
    this.dialogRef.close("ok");
  };

  public onCancel = (): void => {
    this.dialogRef.close("cancel");
  };
}
