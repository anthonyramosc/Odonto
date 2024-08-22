import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtronumdep'
})
export class Filter1Pipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const post of value){
      if(post.id.numDeposito.indexOf(arg) > -1){
         resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
