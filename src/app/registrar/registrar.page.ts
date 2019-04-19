import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    private afStore: AngularFirestore,
    public alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

  async register(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
    .then(
      result => {
        console.log(result);
        console.log(this.afAuth.auth.currentUser);
        this.afStore.collection('Usuarios').doc(this.afAuth.auth.currentUser.uid).set({
            Nombre: this.user.name
          })
          .then(() => {
            this.navCtrl.navigateForward('/iniciar');
            this.afAuth.auth.signOut();
          })
          .catch(err => console.log(err));
      }
    )
    .catch(err => {
      console.log(err.code);
      this.showRegisterError(err.code);
    });
  }

  async showRegisterError(error)
  {
    var message = "error";
    var header = "ERROR"
    switch(error)
      {

        case "auth/invalid-email":
        message = "Email invalido";
        break;
        case "auth/weak-password":
        message = "La contraseña tiene que tener mas de 8 caracteres";
        break;
        default:
        message = "Ocurrio un error al registrar, intente de nuevo";
      }

    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ["OK"]
    });

    await alert.present();
  }

}
