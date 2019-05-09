import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Producto } from "../../models/producto";

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
  constructor(private afStore:AngularFirestore, private afAuth:AngularFireAuth) { }

  ngOnInit() {
    this.productos_carrito = this.getKartList().snapshotChanges();
    this.productos_carrito.forEach(snap => {
      snap.forEach(producto => {
        var data = producto.payload.doc.data();
        this.total += data.Precio * data.cantidad;
        this.cantidad++;
      });
    });
  }

  private getKartList() : AngularFirestoreCollection<Producto>{
    return this.afStore.collection("Usuarios").doc(this.uid).collection("Carrito");
  }

}
