import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.module').then((e) => e.UserModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((e) => e.HomeModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main/main.module').then((e) => e.MainModule),
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
