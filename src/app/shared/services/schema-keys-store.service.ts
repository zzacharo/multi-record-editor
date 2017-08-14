import { Injectable } from '@angular/core';
import { fromJS, OrderedSet } from 'immutable';
import * as _ from 'lodash';

@Injectable()
export class SchemaKeysStoreService {

  public separator = '/';
  public schemaKeyStoreMap: { [path: string]: OrderedSet<string> } = {};
  public schema;
  constructor() { }

  public forPath(path: string) {
    if (path === '') {
      return this.schemaKeyStoreMap[''].toArray();
    }
    return this.schemaKeyStoreMap[`${this.separator}${path}`] ? this.schemaKeyStoreMap[`${this.separator}${path}`].toArray() : [];
  }

  public forPathReq(path: string) {
    let schema = this.schema;
    let splitPath = path.split('/');
    for (let index in splitPath) {
      if (path === '') {
        return this.schemaKeyStoreMap[''].toArray();
      }
      if (schema['type'] === 'object') {
        schema = schema['properties'][splitPath[index]]
      }
      else if (schema['type'] === 'array') {
        if (schema['items']['type'] === 'object') {
          schema = schema['items']['properties'][splitPath[index]]
        }
      }
    }
    if (schema['required']) {
      return schema['required'];
    }
    if (schema['items']) {
      if (schema['items']['required']) {
        return schema['items']['required'];
      }
    }
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

  private isObjectOrArraySchema(schema: {}) {
    return schema['type'] === 'object' || schema['type'] === 'array';
  }

  public find_subschema(path: string) {
    let subSchema = this.schema
    if (path === "") {
      return {'properties':{shittyProperty:subSchema}, 'type':'object'}
    }
    let splitPath = path.split('/')
    for (let index in splitPath) {
      if (subSchema['type'] === 'object') {
        if (subSchema['properties'][splitPath[index]]) {
          subSchema = subSchema['properties'][splitPath[index]]
        }
      }
      else if (subSchema['type'] === 'array') {
        if (subSchema['items']['properties'][splitPath[index]]) {
          subSchema = subSchema['items']['properties'][splitPath[index]]
        }
      }
      else {
        console.log('fixme')
      }
    }
    if (subSchema['type'] === 'array') {
      subSchema = subSchema['items']
    }
    return {'properties':{shittyProperty:subSchema}, 'type':'object'}
  }
}