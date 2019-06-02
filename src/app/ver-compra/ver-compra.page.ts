import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-ver-compra',
  templateUrl: './ver-compra.page.html',
  styleUrls: ['./ver-compra.page.scss'],
})
export class VerCompraPage implements OnInit {

  private uid = this.afAuth.auth.currentUser.uid;
  private cid = null;
  public productos = [];
  constructor(public actRoute : ActivatedRoute, public afAuth : AngularFireAuth, public afStore : AngularFirestore) {}

  ngOnInit() {
    this.cid = this.actRoute.snapshot.paramMap.get('myid');
    this.afStore.collection("Usuarios").doc(this.uid).collection("Compras").doc(this.cid).collection("Productos").get()
    .forEach(snap => {
      snap.forEach(producto => {
        var data = producto.data();
        this.productos.push({
          img: data.img,
          Nombre: data.Nombre,
          Precio: data.Precio,
          Descripcion: data.Descripcion,
          cantidad: data.Cantidad
        });
      });
    });
  }

}
