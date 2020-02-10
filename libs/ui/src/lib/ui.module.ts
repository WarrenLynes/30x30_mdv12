import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '@mdv12/material';
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { ListComponent } from './list/list.component';
import { LoadingComponent } from './loading/loading.component';
import { TimerComponent } from './timer/timer.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [MaterialModule, CommonModule],
  declarations: [LoginComponent, ToolbarComponent, DialogFormComponent, ListComponent, LoadingComponent, TimerComponent, FormComponent],
  exports: [LoginComponent, ToolbarComponent, DialogFormComponent, ListComponent, LoadingComponent, TimerComponent, FormComponent],
  entryComponents: [DialogFormComponent]
})
export class UiModule {}
