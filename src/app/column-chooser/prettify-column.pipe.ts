import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettifyColumn'
})
export class PrettifyColumnPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return 'lol';
  }

}
