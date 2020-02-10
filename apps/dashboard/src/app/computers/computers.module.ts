import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputersComponent } from './computers.component';
import { RouterModule } from '@angular/router';
import { FormComponent, ListComponent, UiModule } from '@mdv12/ui';
import { DetailsComponent } from './details/details.component';
import { MaterialModule } from '@mdv12/material';

@NgModule({
  declarations: [ComputersComponent, DetailsComponent],
  imports: [
    CommonModule,
    UiModule,
    MaterialModule,
    RouterModule.forChild([
      {path: '', component: ComputersComponent, children: [
          { path: '', component: ListComponent },
          { path: 'create', component: FormComponent },
          { path: ':id', component: DetailsComponent },
        ]}
    ])
  ]
})
export class ComputersModule { }
