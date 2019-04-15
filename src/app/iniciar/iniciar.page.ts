import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth'
import { NavController } from '@ionic/angular';
 
@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.page.html',
  styleUrls: ['./iniciar.page.scss'],
})
export class IniciarPage implements OnInit {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController) { }

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
    .catch(err => console.log(err.code));
    // this.afAuth.auth.signOut().then(
    //   ()=>console.log(this.afAuth.auth.currentUser)
    // );
  }

}
