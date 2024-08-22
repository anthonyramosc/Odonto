import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtertipobien'
})
export class FiltertipobienPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultDacionPago = [];
    for(const post of value){
      if(post.codTipoBien.toString().indexOf(arg) > -1){
        resultDacionPago.push(post);
      };
    };
    return resultDacionPago;
  }

}
