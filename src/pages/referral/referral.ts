import { Component } from '@angular/core';
import { Alert, IonicPage, NavController, LoadingController, NavParams, ToastController, AlertController, Loading } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ProfileProvider } from "../../providers/profile/profile";

/**
 * Generated class for the ReferralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-referral',
  templateUrl: 'referral.html',
})
export class ReferralPage {
  public loading: Loading;
  referral: any
  public allRef: any[];
  public totalCount: any;
  public psUrl = 'https://play.google.com/store/apps/details?id=ai.phasta.ray';
  public title = 'Phasta Nigeria';
  public description;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public profileProvider: ProfileProvider,
    public socialShare: SocialSharing, public navParams: NavParams, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create();

  }

  ionViewCanEnter() {
    this.profileProvider.getUserProfile().once("value", userProfileSnapshot => {
      this.referral = userProfileSnapshot.val().referral;
      this.description = `Download and register with referral code ${this.referral} for great discounts`;
      this.loading.dismissAll();
    }).then(()=>{
      //console.log(this.referral);
      this.profileProvider.getAllReferral().on("value", snapshot => {
        this.allRef = [];
        snapshot.forEach(snap => {
          this.allRef.push({
            list: snap.val()
          })
          return false;
        });
        //console.log(this.allRef);
        let counter = 0;
        let refCount = [];
        for (let i = 0; i < this.allRef.length; i++) {
          if (this.allRef[i].list == this.referral)
            refCount.push(this.allRef[i])
          counter++;
        }
  
        if (counter == this.allRef.length) {
          this.totalCount = refCount.length;
          console.log(this.totalCount);
        }
  
      })
    })



    if (this.referral == undefined) {
      this.openPage();
    }
  }

  openPage() {
    this.loading = this.loadingCtrl.create({ spinner: 'dots', enableBackdropDismiss: true, duration: 30000 })
    this.loading;
    this.loading.present();
    setTimeout(() => {
      if (this.referral == undefined) {
        const alert: Alert = this.alertCtrl.create({
          title: "Network Error",
          subTitle: "Your Network appears to be slow or unavailable",
          buttons: [{ text: 'OK', handler: () => { this.navCtrl.popToRoot() } }]
        })
        alert.present();
      }
    }, 60000);
  }




  instaShare() {
    this.loading = this.loadingCtrl.create({ spinner: 'dots', enableBackdropDismiss: true})
    this.loading.present();
    this.socialShare.shareWithOptions({
      message: `${this.title} - ${this.description}: ${this.psUrl}`})
      .then(() => {this.loading.dismiss();
      },
        () => {
          let toast = this.toastCtrl.create({
            message: "Error",
            dismissOnPageChange: false,
            duration: 3000
          });
          toast.present();
        })
  }




}
