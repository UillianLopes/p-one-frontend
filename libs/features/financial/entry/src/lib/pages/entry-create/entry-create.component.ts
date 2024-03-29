import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NamedModel } from '@p-one/core';
import { EEntryType } from '@p-one/domain/financial';

import { EntryCreateFacade } from './+state/entry-create.facade';

@Component({
  selector: 'p-one-entry-create',
  templateUrl: './entry-create.component.html',
  styleUrls: ['./entry-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryCreateComponent implements OnDestroy, OnInit {
  readonly EntryType = EEntryType;
  readonly isLoading$ = this._facade.isLoading$;
  readonly generalInfoFormType$ = this._facade.generalInfoFormType$;

  readonly displayFn = ({ name }: NamedModel) => name;

  constructor(private readonly _facade: EntryCreateFacade) {}

  ngOnInit(): void {
    this._facade.loadWallets();
  }

  ngOnDestroy(): void {
    this._facade.resetState();
  }
}
