import { Pipe, PipeTransform } from '@angular/core';
import { fromJS, Map, List } from 'immutable';
import * as _ from 'lodash';
import { JsonUtilsService } from '../services/json-utils.service';


@Pipe({
  name: 'tagFilter'
})
export class TagFilterPipe implements PipeTransform {

  constructor(public jsonUtilsService:JsonUtilsService) { }

  transform(records: Array<{}>, filterExpressionArray: Array<string>): any {
    if (filterExpressionArray && filterExpressionArray.length > 0) {
      let expArray = filterExpressionArray.map(exp => exp.split('/'));
      let _records = [];
      records.forEach(record => {
        let res = this.jsonUtilsService.filterJson(record, expArray);
        if (!_.isEmpty(res)) {
          _records.push(res);
        }
      });
      return _records;
    }
    return records;
  }



}

