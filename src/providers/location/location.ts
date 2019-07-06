import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var google;
@Injectable()
export class LocationProvider {


  constructor(public geolocate: Geolocation) {
  //  console.log('Hello LocationProvider Provider');
  }


  getLocation() {
    let options = { timeout: 5000, maximumAge:300000, enableHighAccuracy: true };
    return new Promise((resolve, reject) => {
      this.geolocate.getCurrentPosition(options)
      .then(resp => {
        let latitude = resp.coords.latitude;
        let longitude = resp.coords.longitude;
        let geocoder = new google.maps.Geocoder;
        let latlng = { lat: latitude, lng: longitude };
        geocoder.geocode({ 'location': latlng }, (results, status) => {
         // console.log(results);
         // console.log(status);
          resolve(results[0].formatted_address);
         const format = results[0].formatted_address ;
         return format;
        })
      }) 
      .catch((error) => {
        console.log(" Geolocation error : " , error.message);
        reject(error.message);
      })
      
    }) 

    
     
  }



}
