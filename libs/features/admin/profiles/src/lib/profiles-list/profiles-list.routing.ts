import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilesListComponent } from './profiles-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {}
