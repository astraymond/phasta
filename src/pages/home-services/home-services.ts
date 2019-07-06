import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ModalController, LoadingController, Alert, Loading, IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from "../../providers/event/event";
import { LocationProvider } from '../../providers/location/location';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the HomeServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-services',
  templateUrl: 'home-services.html',
})
export class HomeServicesPage {
  public gps;
  public loading: Loading;
  public minDate;
  public currentDate;
  public orders;
  public eventName;
  public eventDate;
   public eventTime 
  public eventPlace;
  public eventCost;
  public selectedCost;
  @ViewChild('myInput') myInput: ElementRef;

  resize() {
    this.myInput.nativeElement.style.height = 'auto';
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public location: LocationProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public datePipe: DatePipe


  ) {
  }

  postLocation() {
    this.eventProvider.connectedRef.once("value", snap => {
      if (snap.val() === true) {
        this.location.getLocation()
          .then((resolve) => {
            this.loading.dismiss()
              .then(() => {
                this.gps = resolve;
                // console.log('answer' + resolve);
              })
          })
          .catch((reject) => {
            this.loading.dismiss().then(() => {
              const alert: Alert = this.alertCtrl.create({
                message: reject,
                buttons: [{ text: 'Ok', role: 'cancel' }]
              });
              alert.present();
            });
          })

        this.loading = this.loadingCtrl.create({
          content: "Getting your location ,please wait...",
          spinner: 'dots', enableBackdropDismiss: true
        });
        this.loading.present();
      } else {
        let alert = this.alertCtrl.create({
          title: "Network Error",
          subTitle: "Please check your connection and try again",
          buttons: ['OK']
        })
        alert.present();
      }
    });
  }



ionViewDidEnter() {
  this.eventProvider.getCost().once('value', snapshot => {
    this.orders = snapshot.val();

  }) 
}



  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeServicesPage');
    let date = new Date();
    this.minDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.currentDate = date.getTime();
    // console.log(this.currentDate);
    // console.log(date);

   }


  getCost() {

    if (this.orders[this.eventName] !== undefined ) {
      this.selectedCost = this.orders[this.eventName]; 
      console.log(this.selectedCost);
    } else {
      this. selectedCost = 0;
      console.log(this.selectedCost);
    }
   
  }



  qs(a, b) {
    let alert = this.alertCtrl.create({
      title: a,
      subTitle: b,
      buttons: ['OK']
    })
    alert.present();
  }

eventList() {
  this.createEvent(this.eventName,this.eventDate,this.eventTime,this.eventPlace,this.eventCost)
}


  createEvent(
    eventName: string,
    eventDate,
    eventTime,
    eventPlace = this.gps,
    eventCost: number= 0
  ): void {
    // getting cost from database
    this.eventProvider.getCost().child(`${eventName}`).once('value', snapshot => {
      let order = snapshot.val();
      console.log(order);
      if(order !== null ) {
        eventCost = order;
      }

      let bgValidator = [eventName, eventDate, eventTime, eventPlace];
      let errorBag = ['Service', 'Date', 'Time', 'Address'];
      let fulMsg = ['Please choose service', 'Please Specify a date', 'Please specify time', 'Address field empty'];
      let count = 0;
      let orderTime = eventDate + ' ' + eventTime;
      let expectedTime = new Date(orderTime).getTime();
      //console.log(orderTime);
     // console.log(expectedTime);

      for (let i = 0; i < bgValidator.length; i++) {
        if (bgValidator[i] == undefined || bgValidator[i] == null || bgValidator[i] == "") {
          this.qs(errorBag[i], fulMsg[i])
          break;
        } else {
          count++
        }
      }
      if (count == bgValidator.length) {
        if (expectedTime > this.currentDate) {
          this.loading = this.loadingCtrl.create({ content: "Requesting ,please wait...", showBackdrop: true });
          // this.loading;
          this.loading.present();
          this.eventProvider.connectedRef.once("value", snap => {
            if (snap.val() === true) {
              this.eventProvider.createEvent(eventName, null, eventDate, eventTime, eventPlace, eventCost, '')
                .then(newEvent => {
                  this.loading.dismiss().then(() => {
                    this.loading = null;
                    this.navCtrl.pop();
                  })
                })


            } else {
              setTimeout(() => {
                if (this.loading) {
                  this.loading.dismiss().then(() => {
                    let alert = this.alertCtrl.create({
                      title: "No Internet",
                      subTitle: "Internet connection appears to be slow or unavailable",
                      buttons: ['OK']
                    })
                    alert.present();
                  });
                }
              }, 5000);
            }
          });

        } else {
          let alert = this.alertCtrl.create({
            title: "Invalid time",
            subTitle: "Timeframe has expired",
            buttons: ['OK']
          })
          alert.present();
        }


      }



    })




  }


}


