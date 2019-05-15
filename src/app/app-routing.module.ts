import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'carne', loadChildren: './carne/carne.module#CarnePageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'graficas', loadChildren: './graficas/graficas.module#GraficasPageModule' },
  { path: 'historial', loadChildren: './historial/historial.module#HistorialPageModule' },
  { path: 'iniciar', loadChildren: './iniciar/iniciar.module#IniciarPageModule' },
  { path: 'registrar', loadChildren: './registrar/registrar.module#RegistrarPageModule' },  { path: 'comprar', loadChildren: './comprar/comprar.module#ComprarPageModule' },
  { path: 'pan', loadChildren: './pan/pan.module#PanPageModule' }

  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
