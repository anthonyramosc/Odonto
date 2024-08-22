import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtermonto'
})
export class FiltermontoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const post of value){
      if(post.valNominal.toString().indexOf(arg) > -1){
         resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
