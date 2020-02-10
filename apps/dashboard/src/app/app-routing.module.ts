import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenInterceptor } from './auth.interceptor';
import { LoginComponent, NotFoundComponent, UiModule } from '@mdv12/ui';
import { MaterialModule } from '@mdv12/material';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'computers', pathMatch: 'full' },
  { path: 'computers', canActivate: [AuthGuard], loadChildren: () => import('./computers/computers.module').then(m => m.ComputersModule)},
  { path: 'lostnfound', component: NotFoundComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'lostnfound', pathMatch: 'full' }
];

@NgModule({
  declarations: [ NotFoundComponent ],
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    UiModule
  ],
  exports: [RouterModule],
  providers: [TokenInterceptor]
})
export class AppRoutingModule { }
