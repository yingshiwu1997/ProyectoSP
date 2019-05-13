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
    this.productos_carrito = this.getKartList().snapshotChanges();
    this.productos_carrito.forEach(snap=>{
      this.productos = [];
      snap.forEach(producto => {
        var data = producto.payload.doc.data();
        var id = producto.payload.doc.id;
        this.productos.push({
          id: id,
          Nombre: data.Nombre,
          Categoria: data.Categoria,
          Precio: data.Precio,
          img: data.img,
          cantidad: data.cantidad
        });
      });
    });
  }

  private increment (index) {
    if(this.productos[index].cantidad < this.max){
      this.afStore.collection("Usuarios").doc(this.uid).collection("Carrito").doc(this.productos[index].id).update({
        cantidad: this.productos[index].cantidad + 1
      });
    }
  }
  
  private decrement (index) {
    if(this.productos[index].cantidad > 1){
      this.afStore.collection("Usuarios").doc(this.uid).collection("Carrito").doc(this.productos[index].id).update({
        cantidad: this.productos[index].cantidad - 1
      });
    }
  }

  private remove(index){
    this.afStore.collection("Usuarios").doc(this.uid).collection("Carrito").doc(this.productos[index].id).delete()
    .catch(error => console.error(error));
  }

  private getKartList() : AngularFirestoreCollection<Producto>{
    return this.afStore.collection("Usuarios").doc(this.uid).collection("Carrito");
  }

}
