import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// External modules
import 'hammerjs';
import { NgxCarouselModule } from 'ngx-carousel';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { NgxMaskModule } from 'ngx-mask';
import { RatingModule } from 'ngx-bootstrap/rating';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

// Router
import { AppRoutingModule } from './app.routing';

// Pipes
import { SafedomPipe } from './pipes/safedom.pipe';

// Services
import { HttpService } from './services/http.service';
import { SessionService } from './services/session.service';
import { SweetAlertService } from './services/sweet-alert.service';
import { HttpInterceptorService } from './services/http-interceptor.service';

// Main component
import { AppComponent } from './app.component';

// Generic Components
import { NavbarComponent } from './components/generic/navbar/navbar.component';
import { SidebarComponent } from './components/generic/sidebar/sidebar.component';
import { FooterComponent } from './components/generic/footer/footer.component';

// Components
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { EditableProfileComponent } from './components/editable-profile/editable-profile.component';
import { ActivationComponent } from './components/activation/activation.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    SidebarComponent,
    RegisterComponent,
    EditableProfileComponent,
    SafedomPipe,
    FooterComponent,
    ActivationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    BrowserAnimationsModule,

    NgSelectModule,
    TagInputModule,
    NgxCarouselModule,
    NgxMaskModule.forRoot(),
    RatingModule.forRoot(),
    RecaptchaModule.forRoot()
  ],
  providers: [
    HttpService,
    SessionService,
    SweetAlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
