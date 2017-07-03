import { Injectable } from '@angular/core';
import { fromJS, OrderedSet } from 'immutable';
<<<<<<< d6d09ad4ac6f02127e43d1594aa3adee11f08a45
import * as _ from 'lodash';
=======
>>>>>>> schema-keystore: Service for schema key storage for each schema path

@Injectable()
export class SchemaKeysStoreService {

<<<<<<< d6d09ad4ac6f02127e43d1594aa3adee11f08a45
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
=======
  private schemaSeparator = '/';
  public keyStoreMap: { [path: string]: OrderedSet<string> } = {};

  constructor() { }

  public buildSchemaKeyStore(schema: {}) {
>>>>>>> schema-keystore: Service for schema key storage for each schema path
    this.buildSchemaKeyStoreRecursively('', schema);
  }

  private buildSchemaKeyStoreRecursively(path: string, schema: {}) {

    if (schema['type'] === 'object') {
      let finalKeys = Object.keys(schema['properties']);
<<<<<<< d6d09ad4ac6f02127e43d1594aa3adee11f08a45
      this.schemaKeyStoreMap[path] = fromJS(finalKeys).toOrderedSet();
      finalKeys
        .filter(key => this.isObjectOrArraySchema(schema['properties'][key]))
        .forEach(key => {
          let newPath = `${path}${this.separator}${key}`;
          this.buildSchemaKeyStoreRecursively(newPath, schema['properties'][key]);
        });
=======
      this.keyStoreMap[path] = fromJS(finalKeys).toOrderedSet();
      finalKeys
      .filter(key => this.isObjectOrArraySchema(schema['properties'][key]))
      .forEach(key => {
        let newPath = `${path}${this.schemaSeparator}${key}`;
        this.buildSchemaKeyStoreRecursively(newPath, schema['properties'][key]);
      });
>>>>>>> schema-keystore: Service for schema key storage for each schema path

    }

    if (schema['type'] === 'array') {
      if (schema['items']['type'] === 'object') {
        let finalKeys = Object.keys(schema['items']['properties']);
<<<<<<< d6d09ad4ac6f02127e43d1594aa3adee11f08a45
        this.schemaKeyStoreMap[path] = fromJS(finalKeys).toOrderedSet();
        finalKeys
          .filter(key => this.isObjectOrArraySchema(schema['items']['properties'][key]))
          .forEach(key => {
            let newPath = `${path}${this.separator}${key}`;
            this.buildSchemaKeyStoreRecursively(newPath, schema['items']['properties'][key]);
          });
=======
        this.keyStoreMap[path] = fromJS(finalKeys).toOrderedSet();
        finalKeys
        .filter(key => this.isObjectOrArraySchema(schema['items']['properties'][key]))
        .forEach(key => {
          let newPath = `${path}${this.schemaSeparator}${key}`;
          this.buildSchemaKeyStoreRecursively(newPath, schema['items']['properties'][key]);
        });
>>>>>>> schema-keystore: Service for schema key storage for each schema path
      }
    }
  }

  private isObjectOrArraySchema(schema: {}) {
    return schema['type'] === 'object' || schema['type'] === 'array';
  }
<<<<<<< d6d09ad4ac6f02127e43d1594aa3adee11f08a45

  public find_subschema(path: string) {
    let subSchema = this.schema
    if (path === "") {
      return subSchema
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
    return subSchema
  }
}
=======
}
>>>>>>> schema-keystore: Service for schema key storage for each schema path
