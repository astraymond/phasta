import { Injectable } from '@angular/core';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  public userProfile: firebase.database.Reference;
  public currentUser: User;
  //profilePicture: string = null;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile =
          firebase.database().ref(`/userProfile/${user.uid}`);
      }

    });
  }

  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }


  updateName(firstName: string, lastName: string): Promise<any> {
    return this.userProfile.update({ firstName, lastName });

  }

  updatePhone(phoneNumber: string): Promise<any> {
    return this.userProfile.update({ phoneNumber });
  }

  updateAddress(homeAddress: string): Promise<any> {
    return this.userProfile.update({ homeAddress });
  }


  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.
      EmailAuthProvider.credential(
        this.currentUser.email,
        password
      );
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updateEmail(newEmail).then(user => {
          this.userProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth
      .EmailAuthProvider.credential(
        this.currentUser.email,
        oldPassword
      );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updatePassword(newPassword).then(user => {
          console.log('Password Changed');
        });
      })
      .catch(error => {
        console.error(error);
      });
  }



  async addPicture(profilePicture): Promise<void> {
    if (profilePicture != null) { 
      const storageRef =
          firebase
          .storage()
            .ref(`/userPicture/${this.userProfile.key}/profilePicture.png`)
            await storageRef.putString(profilePicture, 'base64', { contentType: 'image/png' });
      const downloadURL = await storageRef.getDownloadURL();
      return this.userProfile
        .update({ profilePicture: downloadURL })
        } 
      }
        
getAllReferral():firebase.database.Reference {
  const referrals = firebase.database().ref('/referrals');
  return referrals;
}



  }


