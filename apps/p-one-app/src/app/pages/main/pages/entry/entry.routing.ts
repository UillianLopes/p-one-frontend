import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EEntryType } from '@p-one/core';

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
        path: 'create',
        loadChildren: () =>
          import('./pages/entry-create/entry-create.module').then(
            (m) => m.EntryCreateModule
          ),
      },
      {
        path: 'list',
        data: {
          type: undefined,
        },
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
        data: {
          type: EEntryType.Debit,
        },
      },
      {
        path: 'credits',
        loadChildren: () =>
          import('./pages/entry-list/entry-list.module').then(
            (m) => m.EntryListModule
          ),
        data: {
          type: EEntryType.Credit,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryRoutingModule {}
