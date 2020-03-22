import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterModule, Routes } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

//Modules
import { ResourcesModule } from "./resources/resources.module";
import { CommonsModule } from "./commons/commons.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingInterceptorService } from "./commons/services/loading-interceptor/loading-interceptor.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ResourcesModule,
    CommonsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
