import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth'
import { NavController, AlertController } from '@ionic/angular';
 
@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.page.html',
  styleUrls: ['./iniciar.page.scss'],
})
export class IniciarPage implements OnInit {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
    .then(
      result => {
        console.log(result);
        console.log(this.afAuth.auth.currentUser.email);
        this.navCtrl.navigateForward('/tabs');
      } 
    )
    .catch(err =>{
      console.log(err.code);
      this.showLoginError(err.code);
    });
    // this.afAuth.auth.signOut().then(
    //   ()=>console.log(this.afAuth.auth.currentUser)
    // );
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
