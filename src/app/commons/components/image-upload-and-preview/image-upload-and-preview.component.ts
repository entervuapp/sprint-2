import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-image-upload-and-preview",
  templateUrl: "./image-upload-and-preview.component.html",
  styleUrls: ["./image-upload-and-preview.component.scss"],
})
export class ImageUploadAndPreviewComponent implements OnInit {
  private imagePath;
  public imgURL: any;
  public message: string;

  @Output() onAvatarChange = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  public onRemove = (): void => {
    this.imgURL = null;
    if (this.onAvatarChange) {
      this.onAvatarChange.emit({ image: this.imgURL });
    }
  };

  public preview = (files): void => {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      if (this.onAvatarChange) {
        this.onAvatarChange.emit({ image: this.imgURL });
      }
    };
  };
}
