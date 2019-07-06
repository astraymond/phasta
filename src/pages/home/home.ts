import { Component } from '@angular/core';
import { NavController, MenuController, Platform, ModalController, Loading, LoadingController, ViewController, AlertController } from 'ionic-angular';
import { RoadsupportPage } from '../roadsupport/roadsupport';
import { Toast, ToastController } from 'ionic-angular';
import { HomeServicesPage } from '../home-services/home-services';
import { EmergencyPage } from '../emergency/emergency'
import { HomeDeliveryPage } from '../home-delivery/home-delivery';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { EventProvider } from '../../providers/event/event';
import { SupportPage } from '../support/support';
import { Network } from '@ionic-native/network';
import { PaymentPage } from '../payment/payment';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public loading: Loading;
  public active;
  private cancelToast: Toast;
  public activeEvent;
  //public loading: Loading;
  public lastMessage;
  public unread: any;
  public activeLength;
  completedEvent: any[];
  latestOrder;
  public countDown;
  public x;
  public check;



  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public network: Network,
    private locationAccuracy: LocationAccuracy,
    public eventProvider: EventProvider,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
  ) {

    console.log(this.activeLength);

  }


  locationService() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => console.log('Request successful'),
          error => this.locationService()
          // console.log('Error requesting location permissions', error)
        )
      }

    })
  }

  ionViewDidLoad() {
    this.locationService();
    this.activeOrder();
    this.unreadMessage();
    this.orderCompleted();
    //console.log(this.activeLength);


  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'myMenu');
    this.menuCtrl.swipeEnable(true, 'myMenu');
  }


  activeOrder() {
    this.loading = this.loadingCtrl.create({ spinner: 'bubbles', showBackdrop: true, cssClass: 'loadingWrapper' })
    this.loading.present();
    this.eventProvider.connectedRef.on("value", snap => {
      //console.log(snap.val());
      if (snap.val() === true) {
        //this.loading;
        this.check = this.eventProvider.getEventList().orderByChild("status").equalTo("PENDING")
          .on("value", eventListSnapshot => {
            this.activeEvent = [];
            eventListSnapshot.forEach(snap => {
              this.activeEvent.push({
                id: snap.key,
                name: snap.val().name,
                time: snap.val().time,
                date: snap.val().date,
                place: snap.val().place,
                cost: snap.val().cost,
                status: snap.val().status,
                payment: snap.val().payment
              })
              // console.log(this.activeLength);
               console.log(snap.val().payment);

              if (this.activeEvent.length > 0) {
                let maxTime = snap.val().date + ` ${snap.val().time}`
                // console.log(this.activeEvent);
                let countDownDate = new Date(maxTime).getTime();
                // Update the count down every 1 second
                this.x = setInterval(function () {
                  // Get todays date and time
                  let now = new Date().getTime();
                  // Find the distance between now and the count down date
                  let distance = countDownDate - now;
                  // Time calculations for days, hours, minutes and seconds
                  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                  // console.log(now, "now", "countDownDate", countDownDate, "distance", distance, "days", days);
                  // Output the result in an element with id="demo"
                  if (document.getElementById('demo')) {
                    document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
                  }
                  // If the count down is over, write some text 
                  if (distance < 0) {
                    clearInterval(this.x);
                    document.getElementById("demo").innerHTML = "Waiting...";
                  }
                }, 1000);
              }
              return false;
            });
            if (this.loading) {
              console.log('loading Active');
              this.loading.dismiss();
              //this.loading = null;
            }
            // console.log(this.activeEvent.length);
            this.activeLength = this.activeEvent.length;
            //  console.log(this.activeLength);
            //  console.log(eventListSnapshot.val());
          });
      }
      else {
        setTimeout(() => {
          // console.log('no internet');
          if (this.check == undefined) {
            this.loading.dismiss().then(() => {
              const alert = this.alertCtrl.create({
                title: "No Internet",
                subTitle: "Internet connection appears to be slow or unavailable",
                enableBackdropDismiss: false,
                buttons: [
                  { text: 'Retry', handler: () => { this.activeOrder() } },
                  { text: 'Exit', handler: () => { this.platform.exitApp() } }
                ]
              })
              alert.present();
            })

          }
        }, 60000);
      }
    });

  }

  cancelRequest() {
    let alert = this.alertCtrl.create({
      title: "Cancel Request",
      subTitle: "Are you sure you want to cancel request?",
      buttons: [
        { text: 'Yes', handler: () => { this.updateStatus() } },
        { text: 'No', role: 'Cancel' }
      ]

    })
    alert.present();
  }

  cardPay() {
    let data = {price: this.activeEvent[0].cost, request: this.activeEvent[0].id};
      
      this.navCtrl.push(PaymentPage, data);
  }

  updateStatus(): void {
    this.eventProvider.connectedRef.once("value", snap => {
      if (snap.val() === true) {
        this.loading = this.loadingCtrl.create({ spinner: 'bubbles', showBackdrop: false, duration: 2000 })
        this.loading.present();
        this.eventProvider.updateStatus(this.activeEvent[0].id)
          .then(() => {
            clearInterval(this.x);
            this.cancelToast = this.toastCtrl.create({
              dismissOnPageChange: false,
              duration: 3000,
              message: "You have cancelled your Phasta request",
              showCloseButton: false,
              cssClass: "error",
              position: "bottom"
            });
            this.cancelToast.present();
            //console.log(this.check);
          });


      } else {
        let alert = this.alertCtrl.create({
          title: "No Internet",
          subTitle: "Please check your connection and try again",
          buttons: ['OK']
        })
        alert.present();
      }
    });
  }




  unreadMessage() {
    this.eventProvider.showChat().orderByChild("read").equalTo("1").on("value", snapshot => {
      this.lastMessage = [];
      snapshot.forEach(snap => {
        this.lastMessage.push({
          snap: snap.key
        });
        return false;
      });
      this.unread = this.lastMessage.length;
    })
  }






  public roadsupport() {

    this.navCtrl.push(RoadsupportPage);
  }

  public cleaners() {
    this.navCtrl.push(HomeServicesPage);
  }

  public sos() {
    this.navCtrl.push(EmergencyPage);
  }


  public fuel() {
    this.navCtrl.push(HomeDeliveryPage);
  }



  support() {
    this.navCtrl.push(SupportPage);
    // this.viewCtrl.dismiss();
  }


  orderCompleted() {
    this.eventProvider.getEventList().orderByChild('status').equalTo('COMPLETED').limitToLast(1).on('value', snapshot => {
      this.completedEvent = [];
      snapshot.forEach(snap => {
        this.completedEvent.push({
          id: snap.key,
          name: snap.val().name,
          time: snap.val().time,
          date: snap.val().date,
          place: snap.val().place,
          cost: snap.val().cost,
          status: snap.val().status,
          alert: snap.val().alert
        })
        //  console.log(this.completedEvent);
        this.latestOrder = this.completedEvent[0].id;
        clearInterval(this.x);
        if (this.completedEvent[0].status = 'COMPLETED' && this.completedEvent[0].alert != 'ALERTED') {
          const alert = this.alertCtrl.create({
            title: "Completed",
            enableBackdropDismiss: false,
            subTitle: "Your order has been completed.",
            buttons: [{ text: 'ok', handler: () => { this.updateAlert() } }]
          })
          alert.present();
         
        }

        return false;
      })
      // console.log(this.completedEvent);
    })

  }




  updateAlert() {
    this.eventProvider.updateAlert(this.latestOrder);
  }

}


// error => {
//   this.loading.dismiss().then(() => {
//     const alert: Alert = this.alertCtrl.create({
//       message: "Internet connection appears to be slow or unavailable",
//       buttons: [{
//         text: 'OK', role:
//           'cancel'
//       }]
//     });
//     alert.present();
//   });
// }