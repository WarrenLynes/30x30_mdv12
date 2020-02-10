import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import { ComputersFacade } from './computers.facade';
import * as computersActions from './computers.actions';
import { Computer, ComputersService, SnackbarService } from '@mdv12/core-data';
import { ComputersPartialState } from './computers.reducer';
import { AppFacade } from '../app/app.facade';

@Injectable()
export class ComputersEffects {
  loadComputers$ = createEffect(() =>
    this.dataPersistence.fetch(computersActions.loadComputers, {
      run: (
        action: ReturnType<typeof computersActions.loadComputers>,
        state: ComputersPartialState
      ) => {
        this.appFacade.addLoad('[COMPUTERS][LOAD]');
        return this.computersService.all().pipe(
          tap(() => this.notifyService.openSnackBar('Successfully Loaded Computer')),
          map((computers: Computer[]) => computersActions.computersLoaded({ computers })),
          tap(() => this.appFacade.removeLoad('[COMPUTERS][LOAD]'))
        );
      },
      onError: (action: ReturnType<typeof computersActions.loadComputers>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  addComputer$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(computersActions.createComputer, {
      run: (
        action: ReturnType<typeof computersActions.createComputer>,
        state: ComputersPartialState
      ) => {
        this.appFacade.addLoad('[COMPUTERS][CREATE]');

        return this.computersService.create(action.computer).pipe(
          map((computer: Computer) => computersActions.computerCreated({ computer })),
          tap(() => this.notifyService.openSnackBar('Successfully Added a Computer')),
          tap(() => this.appFacade.removeLoad('[COMPUTERS][CREATE]'))
        );
      },
      onError: (action: ReturnType<typeof computersActions.createComputer>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  updateComputer$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(computersActions.updateComputer, {
      run: (
        action: ReturnType<typeof computersActions.updateComputer>,
        state: ComputersPartialState
      ) => {
        this.appFacade.addLoad('[COMPUTERS][UPDATE]');

        return this.computersService.update(action.computer).pipe(
          map((computer: Computer) => computersActions.computerUpdated({ computer })),
          tap(() => this.notifyService.openSnackBar('Successfully Updated a Computer')),
          tap(() => this.appFacade.removeLoad('[COMPUTERS][UPDATE]'))
        );
      },
      onError: (action: ReturnType<typeof computersActions.updateComputer>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  deleteComputer$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(computersActions.deleteComputer, {
      run: (
        action: ReturnType<typeof computersActions.deleteComputer>,
        state: ComputersPartialState
      ) => {
        this.appFacade.addLoad('[COMPUTERS][DELETE]');
        return this.computersService.delete(action.computer.id).pipe(
          map((computer: Computer) => computersActions.computerDeleted({ computer })),
          tap(() => this.notifyService.openSnackBar('Successfully Deleted a Computer')),
          tap(() => this.computersFacade.loadComputers()),
          tap(() => this.appFacade.removeLoad('[COMPUTERS][DELETE]'))
        );
      },
      onError: (action: ReturnType<typeof computersActions.deleteComputer>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ComputersPartialState>,
    private computersService: ComputersService,
    private computersFacade: ComputersFacade,
    private notifyService: SnackbarService,
    private appFacade: AppFacade
  ) {}
}
