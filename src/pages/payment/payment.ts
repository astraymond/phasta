import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, Platform, LoadingController, Loading} from 'ionic-angular';
import { EventProvider } from "../../providers/event/event";
import { ProfileProvider } from "../../providers/profile/profile";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  price: any;
  request: any;
  orderId: any;
  chargeAmount: any;
  public cardpaymentForm: FormGroup;
  loading: Loading;


  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public platform: Platform,
    public eventProvider: EventProvider,
    public profileProvider: ProfileProvider,
    public formBuilder: FormBuilder,
    public navParams: NavParams) {

       this.cardpaymentForm = formBuilder.group({
        card: ['', Validators.compose([Validators.maxLength(16), Validators.minLength(16), Validators.required])],
        cvc: ['', Validators.compose([Validators.maxLength(3), Validators.minLength(3), Validators.required])],
        mm: ['', Validators.compose([Validators.maxLength(2), Validators.minLength(2), Validators.required])],
        yy: ['', Validators.compose([Validators.maxLength(2), Validators.minLength(2), Validators.required])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
    this.price = this.navParams.get('price');
    this.request = this.navParams.get('request');
    this.chargeAmount = this.price;
    this.orderId = this.request;
  }




  useCard(): void {
    this.makePayment(this.cardpaymentForm.value.card, this.cardpaymentForm.value.mm, 
      this.cardpaymentForm.value.yy, this.cardpaymentForm.value.cvc, this.chargeAmount * 100, this.profileProvider.currentUser.email)
  }


  makePayment(card, month, year, cvc, amount, email){
    
  this.platform.ready().then(() => {
    this.loading = this.loadingCtrl.create({spinner: 'bubbles', showBackdrop: true, cssClass: 'loadingWrapper' });
    this.loading.present();
    // Now safe to use device APIs
   (<any>window).window.PaystackPlugin.chargeCard(
      (resp) =>{
     
          this.eventProvider.updatePayment(this.orderId).then(success => {
            this.loading.dismiss().then(()=> {
              this.showPayMentAlert("Thank you", "Payment Was Successful", true);
            })
          }).catch(error =>{})
        
      },
      (resp) =>{
      this.loading.dismiss().then(()=>{
        this.showPayMentAlert("Transaction Failed", "Please Input Your Details Correctly Or Try Another Card", false);
      })
      },
      {
        cardNumber: card, 
        expiryMonth: month, 
        expiryYear: year, 
        cvc: cvc,
        email: email,
        amountInKobo: amount
    });

  })
}

  showPayMentAlert(title, subtitle, canLeave ){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: [ {
        text: "Okay",
        role: 'cancel',
        handler: () => {
         if (canLeave){
          this.navCtrl.popToRoot();
         }
        }
      },],
      enableBackdropDismiss: false 
    });
    alert.present();
  }
}


