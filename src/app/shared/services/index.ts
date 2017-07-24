import { SchemaKeysStoreService } from './schema-keys-store.service';
import { QueryService } from './query.service'
import { JsonUtilsService } from './json-utils.service';

export const SHARED_SERVICES = [
  SchemaKeysStoreService,
  QueryService,
  JsonUtilsService
];

