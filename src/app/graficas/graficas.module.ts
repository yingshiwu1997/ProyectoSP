
import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { IonicModule, NavController } from '@ionic/angular';
import { GraficasPage } from './graficas.page';

const routes: Routes = [
  {
    path: '',
    component: GraficasPage
  }
];

@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GraficasPage]
})
export class GraficasPageModule {
 
  constructor(){

  }
 
}
