import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterfeccompra'
})
export class FilterfeccompraPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const post of value){
      if(post.id.fecCompra.indexOf(arg) > -1){
         resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
