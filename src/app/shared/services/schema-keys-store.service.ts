import { Injectable } from '@angular/core';
import { fromJS, OrderedSet } from 'immutable';
import * as _ from 'lodash';

@Injectable()
export class SchemaKeysStoreService {

  public separator = '/';
  public schemaKeyStoreMap: { [path: string]: OrderedSet<string> } = {};
  public recordKeysStoreMap: any = {};
  public schema = {};

  constructor() { }

  public forPath(path: string): Array<string> {
    if (path === '') {
      return this.schemaKeyStoreMap[''].toArray();
    }
    return this.schemaKeyStoreMap[`${this.separator}${path}`] ? this.schemaKeyStoreMap[`${this.separator}${path}`].toArray() : [];
  }

  public buildSchemaKeyStore(schema: {}) {
    this.schema = schema;
    this.buildSchemaKeyStoreRecursively('', schema);
  }

  private buildSchemaKeyStoreRecursively(path: string, schema: {}) {

    if (schema['type'] === 'object') {
      let finalKeys = Object.keys(schema['properties']);
      this.schemaKeyStoreMap[path] = fromJS(finalKeys).toOrderedSet();
      finalKeys
        .filter(key => this.isObjectOrArraySchema(schema['properties'][key]))
        .forEach(key => {
          let newPath = `${path}${this.separator}${key}`;
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
            let newPath = `${path}${this.separator}${key}`;
            this.buildSchemaKeyStoreRecursively(newPath, schema['items']['properties'][key]);
          });
      }
    }
  }

  private isObjectOrArraySchema(schema: {}): boolean {
    return schema['type'] === 'object' || schema['type'] === 'array';
  }

  public findSubschema(path: string): object {
    let subSchema = this.schema;
    if (path === '') {
      return subSchema;
    }
    let splitPath = path.split('/');
    for (let index in splitPath) {
      if (subSchema['type'] === 'object') {
        if (subSchema['properties'][splitPath[index]]) {
          subSchema = subSchema['properties'][splitPath[index]];
        }
      } else if (subSchema['type'] === 'array') {
        if (subSchema['items']['properties'][splitPath[index]]) {
          subSchema = subSchema['items']['properties'][splitPath[index]];
        }
      }
    }
    if (subSchema['type'] === 'array') {
      subSchema = subSchema['items'];
    } else if (subSchema['type'] !== 'object') {
      // if primitive key then wrap it
      return {
        type: 'object',
        alwaysShow: ['value'],
        properties: {
          value: subSchema
        }
      };
    }
    return subSchema;
  }

}

