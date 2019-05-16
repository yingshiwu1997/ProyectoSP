import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from 'src/models/producto';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(productos: Producto[], texto: string): Producto[] {
    if(texto.length === 0){ return productos}
    texto = texto.toLocaleLowerCase();
    return productos.filter(producto => {
      console.log(producto);
      console.log(producto.Nombre.toLocaleLowerCase().includes(texto));
      return producto.Nombre.toLocaleLowerCase().includes(texto);
    });
  }

}
