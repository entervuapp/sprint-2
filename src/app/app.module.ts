import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PipesModule } from "./commons/pipes/pipes.module";

// Import your library
import { SlickCarouselModule } from "ngx-slick-carousel";

//Modules
import { ResourcesModule } from "./resources/resources.module";
import { CommonsModule } from "./commons/commons.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingInterceptorService } from "./commons/services/loading-interceptor/loading-interceptor.service";
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ResourcesModule,
    SlickCarouselModule,
    CommonsModule,
    PipesModule,
  ],
  entryComponents: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
