import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtervalor'
})
export class FiltervalorPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultDacionPago = [];
    for(const post of value){
      if(post.valNominal.toString().indexOf(arg) > -1){
        resultDacionPago.push(post);
      };
    };
    return resultDacionPago;
  }

}
