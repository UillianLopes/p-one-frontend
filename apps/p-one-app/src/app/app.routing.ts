import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, WithoutAuthGuard } from '@p-one/domain/identity';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then((e) => e.UserModule),
  },
  {
    path: 'sandbox',
    loadChildren: () => import('@p-one/shared').then((e) => e.SandboxModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then((e) => e.MainModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'landing',
    canActivate: [WithoutAuthGuard],
    loadChildren: () => import('./pages/landing/landing.module').then((e) => e.LandingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
