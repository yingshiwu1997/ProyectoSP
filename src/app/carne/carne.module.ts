import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CarnePage } from './carne.page';

const routes: Routes = [
  {
    path: '',
    component: CarnePage
  }
];

@NgModule({
  imports: [ 
    MbscModule, 
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CarnePage]
})
export class CarnePageModule {
  stepper1: number = 1;
  cardSettings: any = {
    theme: 'ios'
};
formSettings = {
  theme: 'ios'
};
}
