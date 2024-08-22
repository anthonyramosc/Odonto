import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filternomemisor'
})
export class FilternomemisorPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultDacionPago = [];
    for(const post of value){
      if(post.nombreEmisor.indexOf(arg) > -1){
        resultDacionPago.push(post);
      };
    };
    return resultDacionPago;
  }

}
