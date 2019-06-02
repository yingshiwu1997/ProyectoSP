import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'carne',
        children: [
          {
            path: '',
            loadChildren: '../carne/carne.module#CarnePageModule'
          }
        ]
      },
      {
        path: 'pan',
        children: [
          {
            path: '',
            loadChildren: '../pan/pan.module#PanPageModule'
          }
        ]
      },
      {
        path: 'vegetales',
        children: [
          {
            path: '',
            loadChildren: '../vegetales/vegetales.module#VegetalesPageModule'
          }
        ]
      },
      {
        path: 'lacteos',
        children: [
          {
            path: '',
            loadChildren: '../lacteos/lacteos.module#LacteosPageModule'
          }
        ]
      },
      {
        path: 'dulces',
        children: [
          {
            path: '',
            loadChildren: '../dulces/dulces.module#DulcesPageModule'
          }
        ]
      },
      {
        path: 'comprar',
        children: [
          {
            path: '',
            loadChildren: '../comprar/comprar.module#ComprarPageModule'
          }
        ]
      },
      {
        path: 'ver-compra/:myid',
        children: [
          {
            path: '',
            loadChildren: '../ver-compra/ver-compra.module#VerCompraPageModule'
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'menu',
        children: [
          {
            path: '',
            loadChildren: '../menu/menu.module#MenuPageModule'
          }
        ]
      },
      {
        path: 'graficas',
        children: [
          {
            path: '',
            loadChildren: '../graficas/graficas.module#GraficasPageModule'
          }
        ]
      },
      {
        path: 'historial',
        children: [
          {
            path: '',
            loadChildren: '../historial/historial.module#HistorialPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
