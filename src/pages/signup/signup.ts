import { Component } from '@angular/core';
import { Alert, IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthProvider } from "../../providers/auth/auth";
import { EmailValidator } from "../../validators/email";
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;
  public firstname;
  public lastname;
  public email;
  public password;
  public confirmPassword;
  public address;
  public phone;
  public referred;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController) {
    console.log(this.refGenerator());
    this.signupForm = formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      confirmPassword: ['', Validators.required],
      referred: [''],

    },
      { validator: this.matchingPasswords('password', 'confirmPassword') }
    );

    this.firstname = this.signupForm.controls['firstname'];
    this.lastname = this.signupForm.controls['lastname'];
    this.email = this.signupForm.controls['email'];
    this.password = this.signupForm.controls['password'];
    this.confirmPassword = this.signupForm.controls['confirmPassword'];
    this.address = this.signupForm.controls['address'];
    this.phone = this.signupForm.controls['phone'];
    this.phone = this.signupForm.controls['phone'];

  }


  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  signupUser(): void {
    if (!this.signupForm.valid) {
      console.log(
        `Need to complete the form, current value: ${this.signupForm.value}`
      );
    } else {
      const email: string = this.signupForm.value.email;
      const password: string = this.signupForm.value.password;
      const firstname: string = this.signupForm.value.firstname;
      const lastname: string = this.signupForm.value.lastname;
      const address: string = this.signupForm.value.address;
      const phone = this.signupForm.value.phone;
      const referral = this.refGenerator();
      const referred = this.signupForm.value.referred
      const refCount = 0;

      this.authProvider.signupUser(email, password, referral, firstname, lastname, address, phone, refCount, referred)
      .then(user => {
          this.loading.dismiss()
          .then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "Ok", role: "cancel" }]
            });
            alert.present();
          });
        });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }


  refGenerator() {
    var randomString = function (length) {

      var text = "";

      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

      for (var i = 0; i < length; i++) {

        text += possible.charAt(Math.floor(Math.random() * possible.length));

      }
      return text;
    }

    // random string length
    var random = randomString(6);
    return random;
  }
}
