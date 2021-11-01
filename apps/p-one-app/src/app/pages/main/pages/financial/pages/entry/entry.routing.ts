import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntryComponent } from './entry.component';

const routes: Routes = [
  {
    path: '',
    component: EntryComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./pages/entry-list/entry-list.module').then(
            (m) => m.EntryListModule
          ),
      },
      {
        path: 'debits',
        loadChildren: () =>
          import('./pages/entry-list/entry-list.module').then(
            (m) => m.EntryListModule
          ),
      },
      {
        path: 'credits',
        loadChildren: () =>
          import('./pages/entry-list/entry-list.module').then(
            (m) => m.EntryListModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryRoutingModule {}
