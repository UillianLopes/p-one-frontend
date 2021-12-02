import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { EntryCreateFacade } from './+state/entry-create.facade';

@Component({
  selector: 'p-one-entry-create',
  templateUrl: './entry-create.component.html',
  styleUrls: ['./entry-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryCreateComponent implements OnInit {
  public readonly isLoading$ = this._facade.isLoading$;
  public readonly isFirstStepInvalid$ = this._facade.isFirstStepInvalid$;
  public readonly isSecondStepInvalid$ = this._facade.isSecondStepInvalid$;

  constructor(private readonly _facade: EntryCreateFacade) {}

  displayFn = (obj: any) => obj.name;

  ngOnInit(): void {}
}
