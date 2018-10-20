import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SalonSpaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salon-spa',
  templateUrl: 'salon-spa.html',
})
export class SalonSpaPage {
public location;
public gps;

postLocation(){
this.gps=this.location;
console.log(this.gps);
}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
let locate= this.navParams.data;
this.location = locate;
    console.log('ionViewDidLoad SalonSpaPage');
  }

}
