import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeServicesPage } from './home-services';

@NgModule({
  declarations: [
    HomeServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeServicesPage),
  ],
})
export class HomeServicesPageModule {}
