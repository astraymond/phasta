import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeDeliveryPage } from './home-delivery';

@NgModule({
  declarations: [
    HomeDeliveryPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeDeliveryPage),
  ],
})
export class HomeDeliveryPageModule {}
