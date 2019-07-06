import { Component, ViewChild } from '@angular/core';
import { Alert, AlertController, Select, IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { ProfileProvider } from "../../providers/profile/profile";
import { AuthProvider } from "../../providers/auth/auth";
import { Camera } from '@ionic-native/camera';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild('mySelect') selectRef: Select;
  public userProfile: any;
  public profilePicture: string = null;
  public loading: Loading


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public cameraPlugin: Camera
  ) {
  }



  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({ spinner: 'bubbles', showBackdrop: false, duration: 30000 });
    this.profileProvider.getUserProfile().once("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.loading.dismiss();
    });
    this.loading;
    this.loading.present();

    setTimeout(() => {
      if (this.userProfile == null || this.userProfile == undefined) {
        this.loading.dismiss();
        const alert = this.alertCtrl.create({
          title: "No Internet",
          subTitle: "Internet connection appears to be slow or unavailable",
          buttons: [
            { text: 'Ok', handler: () => { this.navCtrl.pop() } },
          ]
        })
        alert.present();
      }
    }, 60000);



  }




  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Yout first name & last name",
      inputs: [{
        name: "firstName",
        placeholder: "Your first name",
        value: this.userProfile.firstName
      }, {

        name: "lastName",
        placeholder: "You last name",
        value: this.userProfile.lastName
      }],
      buttons: [{
        text: "Cancel"
      }, {
        text: "Save",
        handler: data => {
          this.profileProvider.updateName(data.firstName, data.lastName);
        }
      }]
    });
    alert.present();
  }

  updateEmail(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [{ name: 'newEmail', placeholder: 'Your new email' },
      { name: 'password', placeholder: 'Your password', type: 'password' }],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider
              .updateEmail(data.newEmail, data.password)
              .then(() => { console.log('Email Changed Successfully'); })
              .catch(error => { console.log('ERROR: ' + error.message); });
          }
        }]
    });
    alert.present();
  }

  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' }],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    alert.present();
  }

  updatePhone(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [{ name: 'newNumber', placeholder: 'Your new Phone', type: 'Number' }],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider
              .updatePhone(data.newNumber)
              .then(() => { console.log('Phone Number Changed Successfully'); })
              .catch(error => { console.log('ERROR: ' + error.message); });
          }
        }]
    });
    alert.present();
  }

  updateAddress(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'newAddress', placeholder: 'New Address', value: this.userProfile.Address }],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updateAddress(
              data.newAddress

            );
          }
        }
      ]
    });
    alert.present();
  }

  addPicture(): void {
    this.profileProvider
      .addPicture(this.profilePicture)
      .then(() => {
        this.profilePicture = null;

      })
  }

  takePicture(sourceType: number) {
    this.cameraPlugin
      .getPicture({
        quality: 95,
        destinationType: this.cameraPlugin.DestinationType.DATA_URL,
        //sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
        sourceType: sourceType,
        allowEdit: true,
        encodingType: this.cameraPlugin.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true
      })
      .then(
        imageData => {
          this.profilePicture = imageData;

        },
        error => {
          console.log("Error ->" + JSON.stringify(error));
        })
      .then(() =>
        this.addPicture());
  }


  openSelect() {
    this.selectRef.open();
  }



}
