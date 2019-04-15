import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController) { }

  ngOnInit() {
  }

  async register(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
    .then(
      result => {
        console.log(result);
        this.afAuth.auth.signOut().then(() => console.log(this.afAuth.auth.currentUser));
        this.navCtrl.navigateForward('/iniciar');
      }
    )
    .catch(err => console.log(err.code));
  }

}
