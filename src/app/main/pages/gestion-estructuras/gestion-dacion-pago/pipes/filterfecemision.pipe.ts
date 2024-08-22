import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterfecemision'
})
export class FilterfecemisionPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultDacionPago = [];
    for(const post of value){
      if(post.fecEmision.indexOf(arg) > -1){
        resultDacionPago.push(post);
      };
    };
    return resultDacionPago;
  }

}
