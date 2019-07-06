import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventProvider } from '../../providers/event/event';
import { SupportPage } from '../support/support';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
public currentEvent: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider 
    ) {
  }

  ionViewDidLoad() {
    this.eventProvider
    .getEventDetail(this.navParams.get("eventId"))
    .on("value", eventSnapshot => {
      this.currentEvent = eventSnapshot.val();
      this.currentEvent.id = eventSnapshot.key;
    });
  }




openSupport() {
  this.navCtrl.push(SupportPage);
}
}
