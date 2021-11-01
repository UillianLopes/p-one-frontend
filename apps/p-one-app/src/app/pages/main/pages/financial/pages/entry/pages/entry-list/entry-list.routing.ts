import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntryListFacade } from './+state/entry-list.facade';
import { EntryListComponent } from './entry-list.component';

const routes: Routes = [
  {
    path: '',
    component: EntryListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryListRoutingModule {
  readonly entries$ = this._facade.entries$;
  readonly isLoading$ = this._facade.isLoading$;
  readonly filter$ = this._facade.filter$;

  constructor(private readonly _facade: EntryListFacade) {}
}
