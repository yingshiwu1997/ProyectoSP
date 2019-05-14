import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
 
@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.page.html',
  styleUrls: ['./iniciar.page.scss'],
})
export class IniciarPage implements OnInit {

  user = {} as User;

  constructor(private nativestorage : NativeStorage, private afAuth: AngularFireAuth, public navCtrl: NavController, public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
    .then(
      result => {
        //this.nativestorage.setItem('userInfo', {email: this.user.email, password: this.user.password})
        //.then(()=>this.nativestorage.getItem('userInfo').then(data => {console.log(data.email); console.log(data.password)}));
        this.navCtrl.navigateRoot('/tabs');
      } 
    )
    .catch(err =>{
      console.log(err.code);
      this.showLoginError(err.code);
    });
  }

  async showLoginError(error){
    var message = "error";
    var header = "ERROR"
    switch(error)
      {

        case "auth/invalid-email":
        message = "Email invalido";
        break;
        case "auth/user-not-found":
        message = "No se encontro usuario con ese Email";
        break;
        case "auth/wrong-password":
        message = "Constraseña incorrecta";
        break;
        default:
        message = "Ocurrio un error al iniciar sesion, intente de nuevo";
      }

    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ["OK"]
    });

    await alert.present();
  }

}
