import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilesComponent } from './profiles.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilesComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./profiles-list').then((m) => m.ProfilesListModule),
      },
      {
        path: ':profileId/details',
        loadChildren: () =>
          import('./profile-details').then((m) => m.ProfileDetailsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {}
