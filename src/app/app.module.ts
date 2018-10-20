import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
import {SalonSpaPage} from '../pages/salon-spa/salon-spa';
import {OtherServicesPage} from '../pages/other-services/other-services';
import {PmsGasPage} from '../pages/pms-gas/pms-gas';
import {EmergencyPage} from '../pages/emergency/emergency';
import {CleanersPage} from '../pages/cleaners/cleaners';
import {RoadsupportPage} from '../pages/roadsupport/roadsupport';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from "../pages/welcome/welcome";
import { SignupPage } from "../pages/signup/signup";
import { SigninPage } from "../pages/signin/signin";
import { AutosizeDirective} from '../directives/autosize/autosize';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';
import { Camera } from '@ionic-native/camera'
import { SigninPageModule } from '../pages/signin/signin.module';
import {ProfilePage} from '../pages/profile/profile';
import { EventProvider } from '../providers/event/event';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    RoadsupportPage,
    CleanersPage,
    PmsGasPage,
    OtherServicesPage,
    EmergencyPage,
    SalonSpaPage,
    AutosizeDirective,
    WelcomePage,
    SignupPage,
    ProfilePage


  ],
  imports: [
    BrowserModule,
    SigninPageModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    RoadsupportPage,
    CleanersPage,
    PmsGasPage,
    OtherServicesPage,
    EmergencyPage,
    SalonSpaPage,
    WelcomePage,
    SignupPage,
    SigninPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    //PositionError,
    NativeGeocoder,
    AuthProvider,
    ProfileProvider,
    Camera,
    ProfileProvider,
    EventProvider
  ]
})
export class AppModule {}
