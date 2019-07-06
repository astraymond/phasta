import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { EventProvider } from "../../providers/event/event";
import { OrderDetailPage } from "../order-detail/order-detail";
/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  public eventList = [];
  public loading: Loading

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public eventProvider: EventProvider
  ) {
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({ spinner: 'bubbles', showBackdrop: false, duration: 30000 });
    this.eventProvider.getEventList().once("value", eventListSnapshot => {
      eventListSnapshot.forEach(snap => {
        this.eventList.push({
          id: snap.key,
          name: snap.val().name,
          date: snap.val().date,
          status: snap.val().status
        });
        // console.log(this.eventList);
        Array.prototype.reverse.apply(this.eventList);
        //console.log(reve);
        return false;

      });
      this.loading.dismiss();
      this.loading = null;
    });
    this.loading;
    this.loading.present();

    setTimeout(() => {
      console.log(this.loading);
      if (this.loading != null) {
        //   this.loading.dismiss();
        const alert = this.alertCtrl.create({
          title: "No Internet",
          subTitle: "Internet connection appears to be slow or unavailable",
          buttons: [
            { text: 'Ok', handler: () => { this.navCtrl.pop() } },
          ]
        });
        alert.present();
      }
    }, 70000);
  }

  goToOrderDetail(eventId: string): void {
    this.navCtrl.push(OrderDetailPage, { eventId: eventId });
  }



}
