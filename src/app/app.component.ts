import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router,
    private afauth: AngularFireAuth,
    private nativestorage : NativeStorage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      /*this.nativestorage.getItem('userInfo').then(data => {
        if(data)
        {
          this.afauth.auth.signInWithEmailAndPassword(data.email, data.password).then(() => {
            this.router.navigateByUrl('tabs');
            this.statusBar.styleDefault();
            this.splashScreen.hide();
          })
          .catch(()=>{
            this.router.navigateByUrl('iniciar');
            this.statusBar.styleDefault();
            this.splashScreen.hide();
          });
        }
        else
        {
          this.router.navigateByUrl('iniciar');
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        }
      })
      .catch(()=>{
        this.router.navigateByUrl('iniciar');
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });*/
      this.router.navigateByUrl('iniciar');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
