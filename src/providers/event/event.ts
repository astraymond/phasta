import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {
  public eventListRef: firebase.database.Reference;
  public chatRef: firebase.database.Reference;
  public profileRef: firebase.database.Reference;
  userId;
  userEvent;
  public connectedRef;
  public name;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase
          .database()
          .ref(`orders/${user.uid}/`);
        this.userId = user.uid;


        this.profileRef = firebase.database().ref(`userProfile/${user.uid}/`);
         this.profileRef.once("value", userProfileSnapshot => {
          let userProfile = userProfileSnapshot.val();
          this.name = `${userProfile.firstName}` + ` ${ userProfile.lastName}` 
      })
    }
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.chatRef = firebase
          .database()
          .ref(`customerChat/${user.uid}/`);
        this.userId = user.uid;

      }


    })

    this.connectedRef = firebase.database().ref(".info/connected");

  }

  createEvent(
    eventName: string,
    eventQuantity: number,
    eventDate: string,
    eventTime: string,
    eventPlace: string,
    eventCost: number,
    eventDestination: string,
    eventStatus = "PENDING",
    user = this.userId
  ): firebase.database.ThenableReference {
    let eventpush = this.eventListRef.push({
      name: eventName,
      quantity: eventQuantity,
      date: eventDate,
      time: eventTime,
      place: eventPlace,
      cost: eventCost,
      destination: eventDestination,
      status: eventStatus,
      userId: user,
      alert: 'AWAITING',
      payment:'NOT PAID',
      client: this.name
    });
    return eventpush
  }

  getEventList(): firebase.database.Reference {
    return this.eventListRef;
  }

  getEventDetail(eventId: string): firebase.database.Reference {
    return this.eventListRef.child(eventId);
  }





  updateStatus(key: string): Promise<any> {
    let cancel = this.eventListRef.child(key);
    return cancel.update({ status: 'CANCELLED' });

  }



  updateAlert(key: string) {
    let alert = this.eventListRef.child(key);
    return alert.update({ alert: 'ALERTED' });
  }



  chatMessage(instantMessage: string): firebase.database.ThenableReference {
    return this.chatRef.push({
      message: instantMessage,
      sendDate: Date(),
      user: this.userId,
    });

  }


  showChat(): firebase.database.Reference {
    return this.chatRef;
  }

  // updateRead(read): Promise<any> {
  //   let status = this.chatRef.child(read);
  //   return status.update({ read: '0' });
  // }


  updateRead() {
    var statusRef = this.chatRef.orderByChild("read").equalTo('1');
    var newValue = '0';
    var coderay = this.chatRef;
    statusRef.once('value', function (snapshot) {
      var updates = {};
      snapshot.forEach(function (childSnapshot) {
        updates[childSnapshot.key + '/read'] = newValue;
        return false;
      });
      coderay.update(updates, function (error) {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log(updates);
        }
      });
    });

  }

updatePayment(key: string) : Promise<any> {
  let paid = this.eventListRef.child(key);
  return paid.update({ payment: 'PAID', status:'COMPLETED' });

}


getCost():firebase.database.Reference {
  const cost = firebase.database().ref('/cost');
  return cost;
  }
   

}
