import * as migration_20261113_083859_initial from './20261113_083859_initial';
import * as migration_20261113_100800_blob_storage_fields from './20261113_100800_blob_storage_fields';

export const migrations = [
  {
    up: migration_20261113_083859_initial.up,
    down: migration_20261113_083859_initial.down,
    name: '20261113_083859_initial',
  },
  {
    up: migration_20261113_100800_blob_storage_fields.up,
    down: migration_20261113_100800_blob_storage_fields.down,
    name: '20261113_100800_blob_storage_fields'
  },
];
