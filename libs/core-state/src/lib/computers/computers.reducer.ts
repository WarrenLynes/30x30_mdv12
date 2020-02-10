import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as computersActions from './computers.actions';
import { Computer } from '@mdv12/core-data';

export const COMPUTERS_FEATURE_KEY = 'computers';

export interface ComputersState extends EntityState<Computer> {
  selectedComputerId?: string | number;
  isLoading: boolean;
}

export interface ComputersPartialState {
  readonly [COMPUTERS_FEATURE_KEY]: ComputersState;
}

export const computersAdapter: EntityAdapter<Computer> = createEntityAdapter<Computer>();

export const initialState: ComputersState = computersAdapter.getInitialState({
  // set initial required properties
  selectedComputerId: null,
  isLoading: false
});

const computersReducer = createReducer(
  initialState,
  on(computersActions.computerSelected, (state, { selectedComputerId }) =>
    Object.assign({}, state, { selectedComputerId })
  ),
  on(computersActions.computersLoaded, (state, { computers }) =>
    computersAdapter.addAll(computers, { ...state, isLoading: false })
  ),
  on(computersActions.computerCreated, (state, { computer }) =>
    computersAdapter.addOne(computer, { ...state, isLoading: false })
  ),
  on(computersActions.computerUpdated, (state, { computer }) =>
    computersAdapter.upsertOne(computer, { ...state, isLoading: false })
  ),
  on(computersActions.computerDeleted, (state, { computer }) =>
    computersAdapter.removeOne(computer.id, { ...state, isLoading: false })
  ),
  on(
    computersActions.loadComputers,
    computersActions.createComputer,
    computersActions.updateComputer,
    computersActions.deleteComputer,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),
);

export function reducer(state: ComputersState | undefined, action: Action) {
  return computersReducer(state, action);
}
