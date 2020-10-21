import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'address' })
export class AddressPipe implements PipeTransform {
    transform(addressObject: any,properties: string[]) {
        let seperator=', '
        let addressString=''
        for (let i = 0; i < properties.length; i++) {
            
            if(i==properties.length-1)
            {
                seperator=''
            }
            addressString=addressString+addressObject[properties[i]]+seperator
  
        }
        return addressString;
    }


}