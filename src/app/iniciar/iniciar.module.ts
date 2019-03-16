import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MbscModule } from '@mobiscroll/angular';
import { IonicModule } from '@ionic/angular';

import { IniciarPage } from './iniciar.page';

const routes: Routes = [
  {
    path: '',
    component: IniciarPage
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
  declarations: [IniciarPage]
})
export class IniciarPageModule {}
