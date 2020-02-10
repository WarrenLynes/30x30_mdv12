import { createAction, props } from '@ngrx/store';

import { Computer } from '@mdv12/core-data';

export const computerSelected = createAction(
  '[COMPUTER][SELECTED]',
  props<{ selectedComputerId: string }>()
);

// Load Actions
export const loadComputers = createAction('[COMPUTER][LOAD]');

export const computersLoaded = createAction(
  '[COMPUTER][LOADED]',
  props<{ computers: Computer[] }>()
);

// Create Actions
export const createComputer = createAction(
  '[COMPUTER][CREATE]',
  props<{ computer: Computer }>()
);

export const computerCreated = createAction(
  '[COMPUTER][CREATED]',
  props<{ computer: Computer }>()
);

// Update Actions
export const updateComputer = createAction(
  '[COMPUTER][UPDATE]',
  props<{ computer: Computer }>()
);

export const computerUpdated = createAction(
  '[COMPUTER][UPDATED]',
  props<{ computer: Computer }>()
);

// Delete Actions
export const deleteComputer = createAction(
  '[COMPUTER][DELETE]',
  props<{ computer: Computer }>()
);

export const computerDeleted = createAction(
  '[COMPUTER][DELETED]',
  props<{ computer: Computer }>()
);
