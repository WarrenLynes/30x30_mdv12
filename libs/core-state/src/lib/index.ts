import { ActionReducerMap } from '@ngrx/store';

import * as fromComputers from './computers/computers.reducer';
import { appReducer, IAppState } from './app/app.reducer';
import { authReducer, IAuthState } from './auth/auth.reducer';

export interface AppState {
  app: IAppState;
  auth: IAuthState;
  computers: fromComputers.ComputersState;
}

export const reducers: ActionReducerMap<AppState> = {
  app: appReducer,
  auth: authReducer,
  computers: fromComputers.reducer,
};

export const defaultState: AppState = {
  app: null,
  auth: null,
  computers: { ids: [] } as fromComputers.ComputersState
};
