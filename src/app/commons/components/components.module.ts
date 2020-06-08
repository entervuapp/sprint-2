import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

// Import your library
import { SlickCarouselModule } from "ngx-slick-carousel";

import { SaveCancelButtonsComponent } from "./save-cancel-buttons/save-cancel-buttons.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { LoginLogoSliderComponent } from "./login-logo-slider/login-logo-slider.component";
import { ErrorMessageComponent } from "./error-message/error-message.component";
import { DirectivesModule } from "../directives/directives.module";
import { LoginFormComponent } from "./login-form/login-form.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ImageUploadAndPreviewComponent } from "./image-upload-and-preview/image-upload-and-preview.component";
import { UploadResumeComponent } from "./upload-resume/upload-resume.component";
import { NoRecordsFoundComponent } from "./no-records-found/no-records-found.component";
import { ConfirmPopupComponent } from "./modals/confirm-popup/confirm-popup.component";
import { AlertsComponent } from "./alerts/alerts.component";
import { HeaderComponent } from "./header/header.component";
import { OrganizationNotificationsComponent } from "./organization-notifications/organization-notifications.component";
import { IndividualNotificationsComponent } from "./individual-notifications/individual-notifications.component";
import { CandidateQueueComponent } from "./candidate-queue/candidate-queue.component";
import { ProfileComponent } from "./profile/profile.component";
import { TimeInputFieldComponent } from "./time-input-field/time-input-field.component";
import { DateInputFieldComponent } from "./date-input-field/date-input-field.component";
import { DisplayDateComponent } from "./display-date/display-date.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { CarouselComponent } from "./carousel/carousel.component";

const COMPONENTS_LIST = [
  SaveCancelButtonsComponent,
  AboutUsComponent,
  ContactUsComponent,
  LoginLogoSliderComponent,
  ErrorMessageComponent,
  LoginFormComponent,
  LoadingSpinnerComponent,
  PageNotFoundComponent,
  ImageUploadAndPreviewComponent,
  UploadResumeComponent,
  NoRecordsFoundComponent,
  ConfirmPopupComponent,
  AlertsComponent,
  HeaderComponent,
  OrganizationNotificationsComponent,
  IndividualNotificationsComponent,
  CandidateQueueComponent,
  ProfileComponent,
  TimeInputFieldComponent,
  DateInputFieldComponent,
  DisplayDateComponent,
  ChangePasswordComponent,
  CarouselComponent,
];

@NgModule({
  declarations: [...COMPONENTS_LIST],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    FontAwesomeModule,
    SlickCarouselModule,
  ],
  exports: [...COMPONENTS_LIST],
})
export class ComponentsModule {}
