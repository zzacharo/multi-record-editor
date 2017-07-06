import { Injectable } from '@angular/core';
import { fromJS, OrderedSet } from 'immutable';
import * as _ from 'lodash';

@Injectable()
export class SchemaKeysStoreService {

  public schemaSeparator = '/';
  public schemaKeyStoreMap: { [path: string]: OrderedSet<string> } = {};
  public recordKeysStoreMap: any = {};

  constructor() { }

  public forPath(path: string) {
    if (path === '') {
      return this.schemaKeyStoreMap[''].toArray();
    }
    return this.schemaKeyStoreMap[`${this.schemaSeparator}${path}`] ? this.schemaKeyStoreMap[`${this.schemaSeparator}${path}`].toArray() : [];
  }

  public buildSchemaKeyStore(schema: {}) {
    this.buildSchemaKeyStoreRecursively('', schema);
  }

  private buildSchemaKeyStoreRecursively(path: string, schema: {}) {

    if (schema['type'] === 'object') {
      let finalKeys = Object.keys(schema['properties']);
      this.schemaKeyStoreMap[path] = fromJS(finalKeys).toOrderedSet();
      finalKeys
      .filter(key => this.isObjectOrArraySchema(schema['properties'][key]))
      .forEach(key => {
        let newPath = `${path}${this.schemaSeparator}${key}`;
        this.buildSchemaKeyStoreRecursively(newPath, schema['properties'][key]);
      });

    }

    if (schema['type'] === 'array') {
      if (schema['items']['type'] === 'object') {
        let finalKeys = Object.keys(schema['items']['properties']);
        this.schemaKeyStoreMap[path] = fromJS(finalKeys).toOrderedSet();
        finalKeys
        .filter(key => this.isObjectOrArraySchema(schema['items']['properties'][key]))
        .forEach(key => {
          let newPath = `${path}${this.schemaSeparator}${key}`;
          this.buildSchemaKeyStoreRecursively(newPath, schema['items']['properties'][key]);
        });
      }
    }
  }

  private isObjectOrArraySchema(schema: {}) {
    return schema['type'] === 'object' || schema['type'] === 'array';
  }


  public filterRecordByPath(record: any, path: Array<any>) {

    let key = path.pop();

    if (_.isObject(record)) {
      if (_.isEmpty(path)) {
        return record[key];
      }
      this.recordKeysStoreMap[key] = this.filterRecordByPath(record[key], path);
    } else if (_.isArray(record)) {
      record.forEach(value => {
        this.filterRecordByPath(value, path);
      })
    }

  }
}
