import { SchemaKeysStoreService } from './schema-keys-store.service';
import { OrderedSet } from 'immutable';

describe('SchemaKeysStoreService', () => {
  let service: SchemaKeysStoreService;

  beforeEach(() => {
    service = new SchemaKeysStoreService();
  });

<<<<<<< d6d09ad4ac6f02127e43d1594aa3adee11f08a45
  it('it should extract keys for each path in a nested complex array', () => {
=======
  it('should test SchemaKeysStoreService for nested complex array', () => {
>>>>>>> schema-keystore: Service for schema key storage for each schema path
    let schema = {
      type: 'object',
      properties: {
        anArray: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              anObject: {
                type: 'object',
                properties: {
                  prop1: {
                    type: 'string'
                  },
                  prop2: {
                    type: 'string'
                  }
                }
              },
              aString: {
                type: 'string'
              },
              innerArray: {
<<<<<<< d6d09ad4ac6f02127e43d1594aa3adee11f08a45
=======
                componentType: 'table-list',
>>>>>>> schema-keystore: Service for schema key storage for each schema path
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    prop1: {
                      type: 'string'
                    },
                    prop2: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    let expectedMap = {
      '': OrderedSet(['anArray']),
      '/anArray': OrderedSet(['anObject', 'aString', 'innerArray']),
      '/anArray/anObject': OrderedSet(['prop1', 'prop2']),
      '/anArray/innerArray': OrderedSet(['prop1', 'prop2'])
    };

    service.buildSchemaKeyStore(schema);
<<<<<<< d6d09ad4ac6f02127e43d1594aa3adee11f08a45
    Object.keys(service.schemaKeyStoreMap)
    .forEach(key => {
      expect(service.schemaKeyStoreMap[key]).toEqual(expectedMap[key]);
=======
    Object.keys(service.keyStoreMap)
    .forEach(key => {
      expect(service.keyStoreMap[key]).toEqual(expectedMap[key]);
>>>>>>> schema-keystore: Service for schema key storage for each schema path
    });

  });

});
