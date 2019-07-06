import { Network } from '@ionic-native/network';
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, MenuController, AlertController, Events, ToastController, IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseconfig } from './credentials';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { ProfilePage } from '../pages/profile/profile';
import { AuthProvider } from '../providers/auth/auth';
import { HistoryPage } from '../pages/history/history';
import { SupportPage } from '../pages/support/support';
import { ReferralPage } from '../pages/referral/referral';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  public userProfile: firebase.database.Reference;

  constructor(public platform: Platform,
    public app: App,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public statusBar: StatusBar,
    public authProvider: AuthProvider,
    public events: Events,
    private ionicApp: IonicApp,
    public network: Network, public networkService: NetworkServiceProvider,
     public toast: ToastController) {
    this.platform.ready().then(() => {
      this.initializeApp();

    });

    this.platform.registerBackButtonAction(() => {
      let activePortal =
        // this.ionicApp._loadingPortal.getActive() ||
        this.ionicApp._modalPortal.getActive()
      //  this.ionicApp._toastPortal.getActive() ||
      //   this.ionicApp._overlayPortal.getActive();
      if (activePortal) {
        let alert = this.alertCtrl.create({
          title: "Exit",
          subTitle: "Do you want to exit the app?",
          buttons: [
            { text: 'Cancel', role: 'Cancel' },
            { text: 'Exit', handler: () => { this.platform.exitApp() } }

          ]
        });
        alert.present()
        // activePortal.dismiss();
      } else {
        if (this.nav.canGoBack()) {
          this.nav.pop();
        } else {
          let alert = this.alertCtrl.create({
            title: "Exit",
            subTitle: "Do you want to exit the app?",
            buttons: [
              { text: 'Exit', handler: () => { this.platform.exitApp() } },
              { text: 'Cancel', role: 'Cancel' }
            ]
          });
          alert.present()
        }
      }
    });

  }



  initializeApp(): void {
    this.statusBar.styleDefault();
    firebase.initializeApp(firebaseconfig);
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = SigninPage;
        unsubscribe();
      } else {
        this.rootPage = HomePage;
        unsubscribe();

      }

      firebase.database().ref(`/userProfile/${user.uid}`).on('value', snapshot =>{
      this.userProfile = snapshot.val()
      });
    });
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
     

    this.splashScreen.hide();
    this.networkService.setSubscriptions();

  }




  logout(): void {
    this.authProvider.logoutUser().then(() => {
      this.nav.setRoot(SigninPage);
    });

  }

  goToProfile(): void {
    this.nav.push(ProfilePage);

  }

  goToHome(): void {
    this.nav.setRoot(HomePage);

  }

  goToHistory(): void {
    this.nav.push(HistoryPage);
  }

  goToSupport(): void {
    this.nav.push(SupportPage);
  }

  goToReferral(): void {
    this.nav.push(ReferralPage);
  }

  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }

}