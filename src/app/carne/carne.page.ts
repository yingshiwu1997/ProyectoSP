import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Producto } from "../../models/producto";

@Component({
  selector: 'app-carne',
  templateUrl: './carne.page.html',
  styleUrls: ['./carne.page.scss'],
})
export class CarnePage implements OnInit {
  private productos = [];
  private uid = this.afAuth.auth.currentUser.uid;
  private productos_carrito;
  private coleccion_productos;
  private max = 100;
  constructor(private afStore : AngularFirestore, private afAuth : AngularFireAuth) { }

  ngOnInit() {

    this.coleccion_productos = this.getProductsList().valueChanges();
    this.productos_carrito = this.getKartList().valueChanges();

    this.coleccion_productos.forEach(snap => {
      this.productos = [];
      snap.forEach(producto => {
        var prod = {
          producto: producto,
          cantidad: 0,
          added: false,
          icon: "cart"
        };
        this.productos_carrito.forEach(snapC => {
          snapC.forEach(prodC =>{
            if(prodC.Nombre === producto.Nombre){
              prod.added = true;
              prod.icon = "checkbox";
            }
          });
        });
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

  private add(index){
    if(this.productos[index].added == false){
      var producto = this.productos[index].producto;
      var cantidad = this.productos[index].cantidad;
      if(cantidad == 0){
        cantidad = 1
        this.productos[index].cantidad = 1;
      }
      this.afStore.collection("Usuarios").doc(this.uid).collection("Carrito").add({
        Categoria: producto.Categoria,
        Nombre: producto.Nombre,
        Precio: producto.Precio,
        img: producto.img,
        cantidad: cantidad
      }).then(()=>{
        this.productos[index].added = true;
        this.productos[index].icon = "checkbox";
      });
    }
  }

  private getProductsList() : AngularFirestoreCollection<Producto> {
    return this.afStore.collection('Productos', ref => ref.where("Categoria", "==", "Carne"));
  }

  private getKartList() : AngularFirestoreCollection<Producto> {
    return this.afStore.collection("Usuarios").doc(this.uid).collection("Carrito");
  }

}
