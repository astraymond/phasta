import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { RoadsupportPage } from '../roadsupport/roadsupport';
import { CleanersPage } from '../cleaners/cleaners';
import { EmergencyPage } from '../emergency/emergency'
import { OtherServicesPage } from '../other-services/other-services';
import { SalonSpaPage } from '../salon-spa/salon-spa';
import { PmsGasPage } from '../pms-gas/pms-gas';
import { Geolocation,GeolocationOptions ,Geoposition, PositionError } from '@ionic-native/geolocation';
import { NativeGeocoder} from '@ionic-native/native-geocoder';

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
lat:any;
lng:any;
public geocoder;
public format;
public result= 'Zal bin hassan';

constructor (public navCtrl: NavController,
              public menuCtrl:MenuController, public geolocate: Geolocation, private nativeGeocoder:NativeGeocoder) {
   
}


ionViewDidLoad() {

    let options = { timeout: 10000, enableHighAccuracy: true };


      this.geolocate.getCurrentPosition(options).then(resp => {
          this.lat = resp.coords.latitude;
          this.lng = resp.coords.longitude;

          let geocoder = new google.maps.Geocoder;
          let latlng= {lat:this.lat, lng:this.lng};
          geocoder.geocode({'location':latlng}, (results, status) =>{
            console.log(results);
            console.log(status);
            let forma = results[0].formatted_address;
            this.format = forma;
            console.log(this.format);
          })
          

          console.log(this.lat);
          console.log(this.lng);
        }).catch ((err: PositionError) => {
            console.log(" Geolocation error : " + err.message);
          })
            
          
        }
  
        ionViewDidEnter() {
          this.menuCtrl.enable(true,'myMenu');
        }

  public roadsupport() {

    this.navCtrl.push(RoadsupportPage,this.format);
  }

  public cleaners() {
    this.navCtrl.push(CleanersPage,this.format);
  }

  public sos() {
    this.navCtrl.push(EmergencyPage,this.format);
  }

  public others() {
    this.navCtrl.push(OtherServicesPage,this.format);
  }

  public salonspa() {
    this.navCtrl.push(SalonSpaPage,this.format);
  }

  public fuel() {
    this.navCtrl.push(PmsGasPage,this.format);
  }


}
