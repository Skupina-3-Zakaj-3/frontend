import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isodate'
})
export class IsodatePipe implements PipeTransform {

  transform(value: string): any {
    
    var date = new Date(value.split('[UTC]')[0]).toUTCString();
    return date;
  }

}
