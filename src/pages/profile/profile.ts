import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileProvider } from "../../providers/profile/profile";
import { AuthProvider } from "../../providers/auth/auth";



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
  public userProfile: any;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider,
    public alertCtrl: AlertController
     ) {
 
  }

  ionViewDidLoad() {

    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      
    });
    
  }




  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Yout first name & last name",
      inputs: [{
        name: "firstName",
        placeholder: "Your first name",
        value: this.userProfile.firstName
      },{

        name: "lastName",
        placeholder: "You last name",
        value: this.userProfile.lastName
      }],
      buttons: [{
        text: "Cancel" 
      },{
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
        { text: 'Save',
          handler: data => {
            this.profileProvider
              .updateEmail(data.newEmail, data.password)
              .then(() => { console.log('Email Changed Successfully'); })
              .catch(error => { console.log('ERROR: ' + error.message); });
        }}]
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
        { text: 'Save',
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
      inputs: [{ name: 'newNumber', placeholder: 'Your new Phone', type: 'Number'}],
      buttons: [
        { text: 'Cancel' },
        { text: 'Save',
          handler: data => {
            this.profileProvider
              .updatePhone(data.newNumber)
              .then(() => { console.log('Phone Number Changed Successfully'); })
              .catch(error => { console.log('ERROR: ' + error.message); });
        }}]
    });
    alert.present();
  }
  
  updateAddress(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'newAddress', placeholder: 'New Address', value: this.userProfile.Address }],
      buttons: [
        { text: 'Cancel' },
        { text: 'Save',
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
}
