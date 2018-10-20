import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CleanersPage } from './cleaners';

@NgModule({
  declarations: [
    CleanersPage,
  ],
  imports: [
    IonicPageModule.forChild(CleanersPage),
  ],
})
export class CleanersPageModule {}
