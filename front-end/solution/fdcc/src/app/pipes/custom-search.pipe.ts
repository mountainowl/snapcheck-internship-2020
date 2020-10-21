import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class CustomSearchPipe implements PipeTransform {

  transform(users: any[], search_string: any, attributes: string[]): any[] {
    if (!users) return [];
    if (!search_string) return users;
    return users.filter(user => {
      var userFound: Boolean;           
      for (let i = 0; i < attributes.length; i++) {
          let temp=this.object_access(user,attributes[i])
        if (temp.toString().toLowerCase().indexOf(search_string.toString().toLowerCase()) !== -1) {
          userFound = true; 
          break;
        }
      }
      return userFound;
    });

  }

   object_access = function(o, ad){
    for (var i=0, ad=ad.split('.'), len=ad.length; i<len; i++){
        o = o[ad[i]];
    };
    return o;
};

}