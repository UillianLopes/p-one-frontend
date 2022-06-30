import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithoutAuthGuard } from '@p-one/domain/identity';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.module').then((e) => e.UserModule),
  },
  {
    path: 'financial',
    loadChildren: () =>
      import('./pages/financial/financial.module').then((e) => e.FinancialModule),
  },
  {
    path: 'landing',
    canActivate: [WithoutAuthGuard],
    loadChildren: () =>
      import('./pages/landing/landing.module').then((e) => e.LandingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
