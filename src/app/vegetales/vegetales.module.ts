import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VegetalesPage } from './vegetales.page';
import { PipesModule } from '../pipes/pipes.module';
const routes: Routes = [
  {
    path: '',
    component: VegetalesPage
  }
];

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VegetalesPage]
})
export class VegetalesPageModule {}
