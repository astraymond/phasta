import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, Loading, LoadingController, NavController, NavParams, MenuController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  public loginForm: FormGroup
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    formBuilder: FormBuilder,
    public menuCtrl: MenuController
  ) {

    // this.menuCtrl.enable(false,'myMenu');


    this.loginForm = formBuilder.group({

      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.loginForm.value}`

      );
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authProvider.loginUser(email, password)
        .then(authData => {
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


  goToSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  resetPassword(): void {
    this.navCtrl.push(ResetPasswordPage);
  }


}
