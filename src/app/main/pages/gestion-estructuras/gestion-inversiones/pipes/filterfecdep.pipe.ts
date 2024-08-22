import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterfecdep'
})
export class FilterfecdepPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const post of value){
      if(post.id.fecDeposito.indexOf(arg) > -1){
         resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
