import { Component, Inject } from '@angular/core';
import { EntryModel } from '@p-one/domain/financial';
import { PONE_DIALOG_DATA } from '@p-one/shared';

import { EntryDetailsModalStore } from './entry-details-modal.state';

@Component({
  selector: 'p-one-entry-details-modal',
  templateUrl: './entry-details-modal.component.html',
  styleUrls: ['./entry-details-modal.component.scss'],
  providers: [EntryDetailsModalStore],
})
export class EntryDetailsModalComponent {
  public readonly isLoading$ = this._store.isLoading$;
  public readonly entry$ = this._store.entry$;

  constructor(
    private readonly _store: EntryDetailsModalStore,
    @Inject(PONE_DIALOG_DATA) entry: EntryModel
  ) {
    this._store.setEntry(entry);
  }
}
