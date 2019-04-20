import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  private cantidad : number[] = [0, 0];
  private max = 100;
  private indice = 0;
  constructor() { }

  ngOnInit() {
  }
  private increment (index) {
    if(this.cantidad[index] < this.max){
      this.cantidad[index]++;
    }
  }
  
  private decrement (index) {
    if(this.cantidad[index] > 0){
      this.cantidad[index]--;
    }
  }

}
