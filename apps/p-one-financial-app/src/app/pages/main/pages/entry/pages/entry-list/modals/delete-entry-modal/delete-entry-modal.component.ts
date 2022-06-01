import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DialogRef, PONE_DIALOG_DATA } from '@p-one/shared';

import { DeleteEntryModalData, DeleteEntryModalStore } from './delete-entry-modal.state';

@Component({
  selector: 'p-one-delete-entry-modal',
  templateUrl: './delete-entry-modal.component.html',
  styleUrls: ['./delete-entry-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DeleteEntryModalStore],
})
export class DeleteEntryModalComponent {
  public readonly willMoreThanOneEntryBeDeleted$ = this._store.willMoreThanOneEntryBeDeleted$;
  public readonly willOnlyOneEntryBeDeleted$ = this._store.willOnlyOneEntryBeDeleted$;
  public readonly entriesTitles$ = this._store.entriesTitles$;
  public readonly isLoading$ = this._store.isLoading$;

  constructor(
    private readonly _store: DeleteEntryModalStore,
    private readonly _dialogRef: DialogRef,
    @Inject(PONE_DIALOG_DATA) data: DeleteEntryModalData
  ) {
    this._store.setData(data);
    this._store.setDialogId(this._dialogRef.dialogId);
  }

  deleteEntries(): void {
    this._store.deleteEntries();
  }
}
