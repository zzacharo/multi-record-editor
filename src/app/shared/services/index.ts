import { SchemaKeysStoreService } from './schema-keys-store.service';
import { QueryService } from './query.service';
import { AppGlobalsService } from './app-globals.service';

export const SHARED_SERVICES = [
  SchemaKeysStoreService,
  QueryService,
  AppGlobalsService
];

export {
  SchemaKeysStoreService,
  QueryService,
  AppGlobalsService
}

