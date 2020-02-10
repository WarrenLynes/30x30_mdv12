import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPersistence } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreConfig, StoreModule } from '@ngrx/store';

import { CoreDataModule } from '@mdv12/core-data';
import { reducers } from '.';
import { AuthEffects } from './auth/auth.effects';
import { ComputersEffects } from './computers/computers.effects';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true
  }
};

@NgModule({
  imports: [
    CommonModule,
    CoreDataModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([
      AuthEffects,
      ComputersEffects
    ]),
    StoreDevtoolsModule.instrument({ name: 'mdv12 Store' })
  ],
  providers: [DataPersistence]
})
export class CoreStateModule {}
