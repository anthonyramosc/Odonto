import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filternumop'
})
export class FilternumopPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultDacionPago = [];
    for(const post of value){
      if(post.numOperacion.indexOf(arg) > -1){
        resultDacionPago.push(post);
      };
    };
    return resultDacionPago;
  }

}
