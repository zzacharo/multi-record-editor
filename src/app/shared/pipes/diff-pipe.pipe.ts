import { Pipe, PipeTransform } from '@angular/core';
import { diffJson } from 'diff'

@Pipe({
  name: 'diffPipe'
})
export class DiffPipePipe implements PipeTransform {

  transform(object1: object, object2: object): any {
    let result = diffJson(object1, object2);
    return result;
  }

}
