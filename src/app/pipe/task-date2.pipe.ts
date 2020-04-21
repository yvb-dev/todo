import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskDate2'
})
export class TaskDate2Pipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
