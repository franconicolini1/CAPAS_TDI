import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {
  transform(lista: any[], textoBuscar: string, campoEnObjeto): any[] {
    if (!textoBuscar || textoBuscar.length === 0 || lista.length === 0) {
      return lista;
    }
    return lista.filter((item) =>
      item[campoEnObjeto].toLowerCase().includes(textoBuscar.toLowerCase())
    );
  }
}
