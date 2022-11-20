import { Component, Input } from '@angular/core';

import { DialogStore } from './dialog.state';

export interface DialogState {
  isLoading?: boolean | null;
}
@Component({
  selector: 'p-one-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [DialogStore],
})
export class DialogComponent {
  public readonly isLoading$ = this._store.isLoading$;

  @Input()
  set isLoading(isLoading: boolean) {
    this._store.setIsLoading(isLoading);
  }

  constructor(private readonly _store: DialogStore) {}
}
