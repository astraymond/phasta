import { Component, OnInit } from '@angular/core';
import { Alert, IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController) {

    this.signupForm = formBuilder.group({
      // firstname: ['', Validators.required],
      // lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      // address: ['', Validators.required],
      // phone: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
       confirmPassword: ['', Validators.required],

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

      this.authProvider.signupUser(email, password).then(
        user => {
          this.loading.dismiss().then(() => {
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
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
