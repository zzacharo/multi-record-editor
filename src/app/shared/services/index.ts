import { ApiService } from './api.service';
import { SchemaKeysStoreService } from './schema-keys-store.service';
import { JsonUtilsService } from './json-utils.service';

export const SHARED_SERVICES = [
  ApiService,
  SchemaKeysStoreService,
  JsonUtilsService
];