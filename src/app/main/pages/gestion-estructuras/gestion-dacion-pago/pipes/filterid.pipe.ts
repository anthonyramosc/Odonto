import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterid'
})
export class FilteridPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultDacionPago = [];
    for(const post of value){
      if(post.idSujeto.indexOf(arg) > -1){
        resultDacionPago.push(post);
      };
    };
    return resultDacionPago;
  }

}
