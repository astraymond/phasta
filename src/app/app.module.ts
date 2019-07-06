import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { HomeDeliveryPage } from '../pages/home-delivery/home-delivery';
import { EmergencyPage } from '../pages/emergency/emergency';
import { HomeServicesPage } from '../pages/home-services/home-services';
import { RoadsupportPage } from '../pages/roadsupport/roadsupport';
import { HomePage } from '../pages/home/home';
import { SignupPage } from "../pages/signup/signup";
import { SigninPage } from "../pages/signin/signin";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';
import { Camera } from '@ionic-native/camera'
import { SigninPageModule } from '../pages/signin/signin.module';
import { ProfilePage } from '../pages/profile/profile';
import { EventProvider } from '../providers/event/event'; 
import { HistoryPage } from '../pages/history/history';
import { SupportPage } from '../pages/support/support';
import { OrderDetailPage } from '../pages/order-detail/order-detail';
import { LocationProvider } from '../providers/location/location';
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { Network } from '@ionic-native/network';
import { ReferralPage } from '../pages/referral/referral';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { DirectivesModule } from '../directives/directives.module';
import { EmergencyPageModule } from '../pages/emergency/emergency.module';
import { HistoryPageModule } from '../pages/history/history.module';
import { OrderDetailPageModule } from '../pages/order-detail/order-detail.module';
import { SupportPageModule } from '../pages/support/support.module';
import { ReferralPageModule } from '../pages/referral/referral.module';
import { RoadsupportPageModule } from '../pages/roadsupport/roadsupport.module';
import { ResetPasswordPageModule } from '../pages/reset-password/reset-password.module';
import { HomeDeliveryPageModule } from '../pages/home-delivery/home-delivery.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import {PaymentPageModule} from '../pages/payment/payment.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { HomeServicesPageModule } from '../pages/home-services/home-services.module';
import { CallNumber } from '@ionic-native/call-number/';
import { DatePipe } from '@angular/common'
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { PaymentPage } from '../pages/payment/payment';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    SigninPageModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    DirectivesModule,
    EmergencyPageModule,
    HistoryPageModule,
    OrderDetailPageModule,
    SupportPageModule,
    ReferralPageModule,
    RoadsupportPageModule,
    HomeDeliveryPageModule,
    SignupPageModule,
    ProfilePageModule,
    PaymentPageModule,
    HomeServicesPageModule,
    ResetPasswordPageModule


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RoadsupportPage,
    HomeServicesPage,
    HomeDeliveryPage,
    EmergencyPage,
    SignupPage,
    SigninPage,
    ProfilePage,
    HistoryPage,
    OrderDetailPage,
    SupportPage,
    ReferralPage,
    PaymentPage,
    ResetPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LocationAccuracy,
    Geolocation,
    NativeGeocoder,
    AuthProvider,
    ProfileProvider,
    Camera,
    ProfileProvider,
    EventProvider,
    LocationProvider,
    NetworkServiceProvider,
    Network,
    SocialSharing,
    CallNumber,
    DatePipe
  ]
})
export class AppModule { } 
