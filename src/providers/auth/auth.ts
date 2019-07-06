import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
 

  constructor() {
  }

  loginUser(email: string, password: string): Promise<any> {

    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string, referral,firstname: string, lastname: string, address:string, number:string, refCount:number, referred:string): Promise<any> {
    return firebase

      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        firebase
          .database()
          .ref(`/userProfile/${newUser.uid}/email`)
          .set(email);
      })
      .then(newUserCredential => {
        firebase
          .database()
          .ref(`/userProfile/${firebase.auth().currentUser.uid}/referral`)
          .set(referral);
      })
      .then(newUserCredential => {
        firebase
          .database()
          .ref(`/userProfile/${firebase.auth().currentUser.uid}/firstName`)
          .set(firstname);
      })
      .then(newUserCredential => {
        firebase
          .database()
          .ref(`/userProfile/${firebase.auth().currentUser.uid}/lastName`)
          .set(lastname);
      }).then(newUserCredential => {
        firebase
          .database()
          .ref(`/userProfile/${firebase.auth().currentUser.uid}/homeAddress`)
          .set(address);
      }).then(newUserCredential => {
        firebase
          .database()
          .ref(`/userProfile/${firebase.auth().currentUser.uid}/phoneNumber`)
          .set(number);
      }).then(newUserCredential => {
        firebase
          .database()
          .ref(`/userProfile/${firebase.auth().currentUser.uid}/refCount`)
          .set(refCount);
      }).then(newUserCredential => {
        if (referred != " ") {
          firebase
          .database()
          .ref('/referrals')
          .push(referred);
        }
      })

      .catch(error => {
        console.error(error);
        throw new Error(error);
      });

  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase

      .database()
      .ref(`/userProfile/${userId}`)
      .off()
    return firebase.auth().signOut();
  }



}





