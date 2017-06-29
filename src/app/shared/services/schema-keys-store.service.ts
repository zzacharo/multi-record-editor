import { Injectable } from '@angular/core';
import { fromJS, OrderedSet } from 'immutable';

@Injectable()
export class SchemaKeysStoreService {

  private schemaSeparator = '/';
  public keyStoreMap: { [path: string]: OrderedSet<string> } = {};

  constructor() { }

  public buildSchemaKeyStore(schema: {}) {
    this.buildSchemaKeyStoreRecursively('', schema);
  }

  private buildSchemaKeyStoreRecursively(path: string, schema: {}) {
    if (schema['items']) {
      schema = schema['items'];
    }

    schema = schema['properties'];

    let finalKeys = Object.keys(schema);
    this.keyStoreMap[path] = fromJS(finalKeys).toOrderedSet();
    finalKeys
    .filter(key => this.isObjectOrArraySchema(schema[key]))
    .forEach(key => {
      let newPath = `${path}${this.schemaSeparator}${key}`;
      this.buildSchemaKeyStoreRecursively(newPath, schema[key]);
    });

  }

  private isObjectOrArraySchema(schema: {}) {
    return schema['type'] === 'object' || schema['type'] === 'array';
  }
}
