import { SchemaKeysStoreService } from './schema-keys-store.service';
import { QueryService } from './query.service';
import { AppGlobalsService } from './app-globals.service';
import { UserActionsService } from './user-actions.service';

export const SHARED_SERVICES = [
  SchemaKeysStoreService,
  QueryService,
  AppGlobalsService,
  UserActionsService
];

export {
  SchemaKeysStoreService,
  QueryService,
  AppGlobalsService,
  UserActionsService
}

