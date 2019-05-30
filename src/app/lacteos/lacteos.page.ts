import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Producto } from "../../models/producto";

@Component({
  selector: 'app-lacteos',
  templateUrl: './lacteos.page.html',
  styleUrls: ['./lacteos.page.scss'],
})
export class LacteosPage implements OnInit {

  private productos = [];
  private uid = this.afAuth.auth.currentUser.uid;
  private productos_carrito;
  private coleccion_productos;
  private max = 100;
  private control = true;
  constructor(private afStore : AngularFirestore, private afAuth : AngularFireAuth) { }

  textoBuscar = '';
  buscar(event){
    const texto = event.target.value;
    this.textoBuscar = texto;
  }

  ngOnInit() {

    this.coleccion_productos = this.getProductsList().snapshotChanges();
    this.productos_carrito = this.getKartList().snapshotChanges();

    this.coleccion_productos.forEach(snap => {
      this.productos = [];
      snap.forEach(producto => {
        var id = producto.payload.doc.id;
        var data = producto.payload.doc.data();
        var prod = {
          id: id,
          img: data.img,
          Nombre: data.Nombre,
          Precio: data.Precio,
          Categoria: data.Categoria,
          Descripcion: data.Descripcion,
          cantidad: 0,
          added: false,
          icon: "cart"
        };
        this.productos_carrito.forEach(snapC => {
          snapC.forEach(prodC =>{
            if(prodC.payload.doc.id == id){
              prod.cantidad = prodC.payload.doc.data().cantidad;
              prod.added = true;
              prod.icon = "checkbox";
            }
          });
        });
        this.productos.push(prod);
      });
    });

    this.productos_carrito.forEach(snapC => {
      if(this.control)
        this.control = false;
      else{
        this.productos.forEach(producto => {
          producto.added = false;
          producto.icon = "cart";
          producto.cantidad = 0;
          snapC.forEach(prodC =>{
            if(prodC.payload.doc.id == producto.id){
              producto.cantidad = prodC.payload.doc.data().cantidad;
              producto.added = true;
              producto.icon = "checkbox";
            }
          });
        });
      }
    });

  }

  private increment (index) {
    if(this.productos[index].cantidad < this.max){
      this.productos[index].cantidad++;
    }
  }
  
  private decrement (index) {
    if(this.productos[index].cantidad > 1){
      this.productos[index].cantidad--;
    }
  }

  private add(index){
    var producto = this.productos[index];
    if(producto.added == false){
      if(producto.cantidad == 0){
        producto.cantidad = 1
      }
      this.afStore.collection("Usuarios").doc(this.uid).collection("Carrito").doc(producto.id).set({
        Categoria: producto.Categoria,
        Descripcion: producto.Descripcion,
        Nombre: producto.Nombre,
        Precio: producto.Precio,
        img: producto.img,
        cantidad: producto.cantidad
      });
    }
  }

  private getProductsList() : AngularFirestoreCollection<Producto> {
    return this.afStore.collection('Productos', ref => ref.where("Categoria", "==", "Lacteos"));
  }

  private getKartList() : AngularFirestoreCollection<Producto> {
    return this.afStore.collection("Usuarios").doc(this.uid).collection("Carrito", ref => ref.where("Categoria", "==", "Lacteos"));
  }
}
