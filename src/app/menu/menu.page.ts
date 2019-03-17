import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  private cantidad = 0;
  private max = 100;
  constructor() { }

  ngOnInit() {
  }
  private increment () {
    if(this.cantidad < this.max){
      this.cantidad++;
    }
  }
  
  private decrement () {
    if(this.cantidad > 0){
      this.cantidad--;
    }
  }
  private guardar(){
    
  }

}
