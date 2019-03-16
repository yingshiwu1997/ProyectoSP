import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';
 
import { IonicModule, NavController } from '@ionic/angular';

import { HomePage } from './home.page';
import { CarnePage } from '../carne/carne.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

RouterModule.forRoot([
  { path: '', component: HomePage },
  { path: 'carne', component: CarnePage }
]);

@NgModule({
  imports: [  
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {
  constructor(){}
  
}
