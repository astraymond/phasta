import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { WelcomePage } from '../pages/welcome/welcome';
import  firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseconfig } from './credentials';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { ProfilePage } from '../pages/profile/profile';
import {AuthProvider} from '../providers/auth/auth';
import { SignupPage } from '../pages/signup/signup';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any;

  constructor(platform: Platform, public menuCtrl:MenuController, statusBar: StatusBar, splashScreen: SplashScreen, public authProvider: AuthProvider) {
    platform.ready().then(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user=> {
       
        if (!user) {
          this.rootPage = 'SigninPage';
          unsubscribe();
        }else {
          this.rootPage = HomePage;

          unsubscribe();
          
        }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(firebaseconfig);
  }
  

  logout(): void {
      this.authProvider.logoutUser().then(() => {
        this.nav.setRoot(SigninPage);
      });
    
  }

  goToProfile () : void {
    this.nav.push(ProfilePage);

  }

  goToHome () : void {
    this.nav.setRoot(HomePage);

  }

}
