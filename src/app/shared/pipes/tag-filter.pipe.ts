import { Pipe, PipeTransform } from '@angular/core';
import { fromJS, Map, List } from 'immutable';
import * as _ from 'lodash';
import {SchemaKeysStoreService} from '../services/schema-keys-store.service';

@Pipe({
  name: 'tagFilter'
})
export class TagFilterPipe implements PipeTransform {

  transform(records: Array<{}>, filterExpression: Array<string>): any {
    if (filterExpression && filterExpression.length > 0) {
      let _records = [];
      records.forEach(record => {
        let filteredRecord = this.filterRecord(record, filterExpression);
        if (!_.isEmpty(filteredRecord)) {
          _records.push(filteredRecord);
        }
      });
      return _records;
    }
    return records;
  }

  filterRecord(json, filterExpression: Array<string>) {
    let _record = {};
    filterExpression.forEach(exp => {
      let record = json;

      if (exp) {
        let tags = exp.split('/');
        tags.forEach(key => {
          if (Array.isArray(record)) {
            record = this.flattenIfNeeded(record);
            record = (record as Array<any>).filter(el => el[key])
            .map(el => {
              return el[key];
            })
          } else {
            record = record[key] ? record[key] : {};
          }
        });
        if (Array.isArray(record)) {
          record = this.flattenIfNeeded(record);
        }
        _record = Object.assign(_record, record);
      }
    });
    return _record;
  }

  flattenIfNeeded(arr: Array<any>) {
    if (Array.isArray(arr[0])) {
      return arr.reduce((pre, cur) => pre.concat(cur), []);
    }
    return arr;
  }
}

