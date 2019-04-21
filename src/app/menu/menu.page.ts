import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Producto } from "../../models/producto";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  private productos = [];
  private uid = this.afAuth.auth.currentUser.uid;
  private productos_carrito;
  private max = 100;
  constructor(private afStore:AngularFirestore, private afAuth:AngularFireAuth) { }

  ngOnInit() {
    this.productos_carrito = this.getKartList().valueChanges();
    this.productos_carrito.forEach(snap=>{
      this.productos = [];
      snap.forEach(producto => {
        this.productos.push({
          Nombre: producto.Nombre,
          Categoria: producto.Categoria,
          Precio: producto.Precio,
          img: producto.img,
          cantidad: producto.cantidad
        });
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

  private remove(index){
    this.afStore.collection("usuario")
  }

  private getKartList() : AngularFirestoreCollection<Producto>{
    return this.afStore.collection("Usuarios").doc(this.uid).collection("Carrito");
  }

}
