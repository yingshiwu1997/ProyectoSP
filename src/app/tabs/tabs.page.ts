import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private alertCtrl : AlertController, private nativestorage : NativeStorage, private afAuth: AngularFireAuth, public navCtrl: NavController) { }

  public logout()
  {
    this.alertLogout();
  }

  async alertLogout()
  {
    const alert = await this.alertCtrl.create({
      header: "Sing Out",
      message: "¿Desea cerrar la sesion actual?",
      buttons: [
        {
          text: "OK",
          handler: ()=>{
            this.afAuth.auth.signOut().then(()=>{
              //this.nativestorage.clear();
              this.navCtrl.navigateRoot('iniciar');
            });
          }
        },
        {
          text: "Cancelar"
        }
      ]
    });
    await alert.present();
  }

}
