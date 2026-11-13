import * as migration_20261113_083859_initial from './20261113_083859_initial';

export const migrations = [
  {
    up: migration_20261113_083859_initial.up,
    down: migration_20261113_083859_initial.down,
    name: '20261113_083859_initial'
  },
];
