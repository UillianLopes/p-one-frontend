import { Component, OnDestroy, OnInit } from '@angular/core';

import { EntryListFacade } from './+state/entry-list.facade';

@Component({
  selector: 'p-one-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
})
export class EntryListComponent implements OnInit, OnDestroy {
  readonly entries$ = this._facade.entries$;
  readonly isLoading$ = this._facade.isLoading$;

  constructor(private readonly _facade: EntryListFacade) {}

  ngOnDestroy(): void {
    this._facade.resetState();
  }

  ngOnInit(): void {
    this._facade.loadEntries();
  }
}
