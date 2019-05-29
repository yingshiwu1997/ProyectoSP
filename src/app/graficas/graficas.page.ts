import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
 
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.page.html',
  styleUrls: ['./graficas.page.scss'],
})
export class GraficasPage implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
   

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Productos' }
  ];

  private uid = this.afAuth.auth.currentUser.uid;
  private productos = {};
  private max = 0;
  public ready = 1;
  public categorias = {
    Carne:{},
    Pan:{},
    Vegetal:{},
    Lacteos:{},
    Dulces:{}
  };
  public catkeys = Object.keys(this.categorias);
  constructor(private afAuth : AngularFireAuth, private afStore : AngularFirestore) { }

  ngOnInit() {
    for(let categoria in this.categorias)
    {
      this.categorias[categoria]["barChartOptions"] = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}] },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
          }
        }
      };
      this.categorias[categoria]["barChartLabels"] = [];
      this.categorias[categoria]["barChartType"] = 'bar';
      this.categorias[categoria]["barChartLegend"] = true;
      this.categorias[categoria]["barChartData"] = [{ data: [], label: categoria }];
      var color = '#000000'
      switch(categoria)
      {
        case 'Carne':
          color = '#ea2c3c';
          break;
        case 'Pan':
          color = '#f9c666';
          break;
        case 'Vegetal':
          color = '#58f450';
          break;
        case 'Lacteos':
          color = '#f7f6be';
          break;
        case 'Dulces':
          color = '#b510ce';
          break;
      }
      this.categorias[categoria]["barChartColors"] = [{ backgroundColor: [color, color, color, color]}];
    }
    this.afStore.collection("Usuarios").doc(this.uid).collection("Compras").get().forEach(snap => {
      this.ready = snap.size;
      snap.forEach(compra => {
        this.afStore.collection("Usuarios").doc(this.uid).collection("Compras").doc(compra.id).collection("Productos").get().forEach(snap2 => {
          var aux = snap2.size;
          snap2.forEach(producto =>{
            if(this.productos[producto.id] == null)
            {
              this.productos[producto.id] = {cantidad: 1, nombre: producto.data().Nombre};
              let i = this.categorias[producto.data().Categoria].barChartLabels.push(producto.data().Nombre);
              this.productos[producto.id]['index'] = i - 1;
            }
            else
            {
              this.categorias[producto.data().Categoria].barChartData[0].data[this.productos[producto.id].index] = ++this.productos[producto.id].cantidad;
              if(this.productos[producto.id].cantidad > this.max) this.max = this.productos[producto.id].cantidad;
            }
            this.categorias[producto.data().Categoria].barChartOptions.scales.yAxes[0].ticks['max'] = this.max;
            if(--aux == 0)
            {
              this.ready--;
            }
          });
        });
      });
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }

}
