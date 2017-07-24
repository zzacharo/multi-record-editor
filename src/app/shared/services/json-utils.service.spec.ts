import { JsonUtilsService } from './json-utils.service';
import { SchemaKeysStoreService } from './schema-keys-store.service';

describe('JsonUtilsService', () => {
 /* it('filters a nested complex object given a path and returns the object keeping the object structure.', () => {
    const service = new JsonUtilsService(new SchemaKeysStoreService());
    let record = {
      authors: [
        {
          affiliations: [
            {
              value:'inst1',
              name: 'inst1'
            },
            {
              value:'inst2',
              name: 'inst2'
            }
          ]
        },
        {
          affiliations: [
            {
              value:'inst3',
              name: 'inst3'
            },
            {
              value:'inst4',
              name: 'inst4'
            }
          ],
          full_name: 'dummy'
        }
      ]
    };

    let expected = {
      authors: [
        {
          affiliations: [
            {
              value:'inst1'
            },
            {
              value:'inst2'
            }
          ]
        },
        {
          affiliations: [
            {
              value:'inst3'
            },
            {
              value:'inst4'
            }
          ],
          full_name: 'dummy'
        }
      ]
    };

    let result = service.filterJson(record, [['authors', 'affiliations', 'value'], ['authors', 'full_name']]);
    expect(result).toEqual(expected);
  });
*/
  it('filters a nested complex object given a path by converting to tree and back', () => {
    const service = new JsonUtilsService(new SchemaKeysStoreService());
    let record = {
      authors: [
        {
          affiliations: [
            {
              value:'inst1',
              name: 'inst1'
            },
            {
              value:'inst2',
              name: 'inst2'
            }
          ]
        },
        {
          affiliations: [
            {
              name: 'inst3'
            }
          ],
          full_name: 'dummy'
        }
      ]
    };
    let expected = {
      authors: [{
        affiliations: [
          {
            value:'inst1'
          },
          {
            value:'inst2'
          }
        ]
      }, {
        full_name: 'dummy'
      }
    ]};
    let tree = service.buildTreeForJson(record);
    let tags = [['authors', 'affiliations', 'value'], ['authors','full_name']];
    let result = service.bfsTraverse(tree, service.tagFilter(tags));
    expect(result).toEqual(expected);
  })
});
