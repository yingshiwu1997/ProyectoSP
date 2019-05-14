import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private nativestorage : NativeStorage, private afAuth: AngularFireAuth, public navCtrl: NavController) { }

  public logout()
  {
    this.afAuth.auth.signOut().then(
      ()=>{
        //this.nativestorage.clear();
        this.navCtrl.navigateRoot('iniciar');
      });
  }

}
