import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-save-cancel-buttons",
  templateUrl: "./save-cancel-buttons.component.html",
  styleUrls: ["./save-cancel-buttons.component.scss"],
})
export class SaveCancelButtonsComponent implements OnInit {
  @Input() saveButtonName: string;
  @Input() cancelButtonName: string;
  @Input() buttonPosition: string;
  @Input() hideCancelButton: boolean;
  @Input() className: string;
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.className = this.className || "";
    this.saveButtonName = this.saveButtonName || "Save";
    this.cancelButtonName = this.cancelButtonName || "Cancel";
    this.buttonPosition = this.buttonPosition || "right";
    this.hideCancelButton = this.hideCancelButton || false;
  }

  saveHandler = () => {
    if (this.onSave) {
      this.onSave.emit();
    }
  };

  cancelHandler = () => {
    if (this.onCancel) {
      this.onCancel.emit();
    }
  };
}
