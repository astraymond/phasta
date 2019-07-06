import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, MenuController, NavParams, Content } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the SupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {
  @ViewChild(Content) content: Content;
  public chatList;
  user: string;
  public instantMessage;







  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public network: Network) {
    this.instantMessage = '';
  }


ionViewDidEnter() {
  this.menuCtrl.enable(false,'myMenu');
  //let lastMsg = this.navParams.data;
  this.eventProvider.updateRead();
}

  ionViewDidLoad() {
    this.user = this.eventProvider.userId;
    console.log('ionViewDidLoad SupportPage');
    this.eventProvider.showChat().on("value", eventListSnapshot => {
      this.chatList = [];
      eventListSnapshot.forEach(snap => {
        this.chatList.push({
          message: snap.val().message,
          sendDate: snap.val().sendDate,
          nickname: snap.val().user,
        });
        return false;
      });
      setTimeout(() => {
        this.content.scrollToBottom(1);
      }, 500);
    });
  }


  sendMessage(instantMessage: string) {
    if ("none" !== this.network.type) {
      this.eventProvider.chatMessage(instantMessage).then(() => {
        this.instantMessage = '';
      })
    } else {
      let alert = this.alertCtrl.create({
        title: "No Network",
        subTitle: "Please check your connection and try again",
        buttons: ['OK']
      })
      alert.present();
    }
  }



}
