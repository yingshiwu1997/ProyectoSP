import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  public compras = [];
  private uid = this.afAuth.auth.currentUser.uid;
  constructor(public afAuth : AngularFireAuth, public afStore : AngularFirestore) { }

  ngOnInit() {
    var snapCompras = this.afStore.collection("Usuarios").doc(this.uid).collection("Compras", ref => ref.orderBy("Fecha", "desc")).snapshotChanges();
    snapCompras.forEach(snap => {
      this.compras = [];
      snap.forEach(compra => {
        var data = compra.payload.doc.data();
        this.compras.push({
          Fecha: data.Fecha.toDate(),
          Total: data.Total,
          Entregado: data.Entregado ? "Entregado": "Pendiente",
          Codigo: data.Codigo
        });
      });
    });
  }

}
