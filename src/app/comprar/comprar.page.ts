import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Producto } from "../../models/producto";
import { User } from '../../models/user';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.page.html',
  styleUrls: ['./comprar.page.scss'],
})
export class ComprarPage implements OnInit {
  private uid = this.afAuth.auth.currentUser.uid;
  private productos_carrito;
  public total = 0;
  public cantidad = 0;
  public productos = [];
  public compra_actual;
  user = {} as User;
  constructor(private afStore:AngularFirestore, private afAuth:AngularFireAuth, private navCtrl : NavController) { }

  ngOnInit() {
    this.productos_carrito = this.getKartList().snapshotChanges();
    this.productos_carrito.forEach(snap => {
      snap.forEach(producto => {
        var data = producto.payload.doc.data();
        this.total += data.Precio * data.cantidad;
        this.productos.push({
          id: producto.payload.doc.id,
          prod:{
            Cantidad: data.cantidad,
            Nombre: data.Nombre,
            Precio: data.Precio 
          }
        });
        this.cantidad++;
      });
    });
  }

  public comprar(){
    this.afStore.collection("Usuarios").doc(this.uid).collection("Compras").add({
      Entregado: false,
      Total: this.total,
      HoraRecogida: this.user.time,
      Nombre: this.user.name,
      NIT: this.user.nit,
      Fecha: firebase.firestore.FieldValue.serverTimestamp() 
    }).then(result => {
      this.compra_actual = result.id;
      this.productos.forEach(producto => {
        this.afStore.collection("Usuarios").doc(this.uid).collection("Compras").doc(result.id).collection("Productos").doc(producto.id).set(producto.prod);
        this.afStore.collection("Usuarios").doc(this.uid).collection("Carrito").doc(producto.id).delete();
      });
      this.navCtrl.navigateRoot('/tabs/historial');
    })
    .catch(error => {
      console.log(error);
      this.afStore.collection("Usuarios").doc(this.uid).collection("Compras").doc(this.compra_actual).delete();
    });
  }

  private getKartList() : AngularFirestoreCollection<Producto>{
    return this.afStore.collection("Usuarios").doc(this.uid).collection("Carrito");
  }

}
