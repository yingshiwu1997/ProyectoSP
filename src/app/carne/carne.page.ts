import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-carne',
  templateUrl: './carne.page.html',
  styleUrls: ['./carne.page.scss'],
})
export class CarnePage implements OnInit {
  private productos = [];
  private max = 100;
  private indice = 0;
  constructor(private afStore : AngularFirestore, private afAuth : AngularFireAuth) { }

  ngOnInit() {
    var coleccion_productos = this.afStore.collection('Productos', ref => ref.where("Categoria", "==", "Carne")).valueChanges();
    coleccion_productos.forEach(snap => {
      snap.forEach(producto => {
        var prod = {
          producto: producto,
          cantidad: 0
        };      
        this.productos.push(prod);
      });
    });
  }

  private increment (index) {
    if(this.productos[index].cantidad < this.max){
      this.productos[index].cantidad++;
    }
  }
  
  private decrement (index) {
    if(this.productos[index].cantidad > 0){
      this.productos[index].cantidad--;
    }
  }
}
