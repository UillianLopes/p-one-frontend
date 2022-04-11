import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithoutAuthGuard } from '@p-one/identity';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.module').then((e) => e.UserModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main/main.module').then((e) => e.MainModule),
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
export class AppRoutingModule {}
