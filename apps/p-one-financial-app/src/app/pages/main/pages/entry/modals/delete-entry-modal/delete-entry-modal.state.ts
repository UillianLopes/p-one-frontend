import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EntryModel, EntryService } from '@p-one/financial';
import { DialogService } from '@p-one/shared';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

export interface DeleteEntryModalData {
  entries: EntryModel[];
}

export interface DeleteEntryModalState {
  dialogId?: string;
  data?: DeleteEntryModalData;
  error?: any;
  isLoading?: boolean;
}

@Injectable()
export class DeleteEntryModalStore extends ComponentStore<DeleteEntryModalState> {
  public readonly dialogId$ = this.select((s) => s.dialogId);
  public readonly data$ = this.select((s) => s.data);
  public readonly entries$ = this.select(this.data$, (d) => d?.entries);

  public readonly willMoreThanOneEntryBeDeleted$ = this.select(
    this.entries$,
    (entries) => entries && entries.length > 1
  );

  public readonly willOnlyOneEntryBeDeleted$ = this.select(
    this.entries$,
    (entries) => entries && entries.length === 1
  );

  public readonly entriesTitles$ = this.select(this.entries$, (entries) =>
    entries?.map((e) => e.title)
  );

  public readonly entriesIds$ = this.select(this.entries$, (entries) =>
    entries?.map((e) => e.id)
  );

  public readonly isLoading$ = this.select((s) => s.isLoading);

  public readonly setDialogId = this.updater((state, dialogId: string) => {
    return {
      ...state,
      dialogId,
    };
  });

  public readonly setData = this.updater(
    (state, data: DeleteEntryModalData) => {
      return {
        ...state,
        data,
      };
    }
  );

  public readonly setIsLoading = this.updater((state, isLoading: boolean) => {
    return {
      ...state,
      isLoading,
    };
  });

  public readonly deleteEntryFailure = this.updater((state, error: any) => {
    return {
      ...state,
      error,
      isLoading: false,
    };
  });

  public readonly deleteEntrySuccess = this.updater((state) => {
    return {
      ...state,
      isLoading: false,
    };
  });

  public readonly deleteEntries = this.effect((data$) => {
    return data$.pipe(
      withLatestFrom(this.entriesIds$),
      tap(() => this.setIsLoading(true)),
      switchMap(([_, entryIds]) => {
        return this._entryService.deleteMultiple(entryIds).pipe(
          withLatestFrom(this.dialogId$),
          tap({
            next: ([_, dialogId]) => {
              this.deleteEntrySuccess();
              this._dialogService.close(dialogId, true);
            },
            error: (error) => this.deleteEntryFailure(error),
          })
        );
      })
    );
  });

  constructor(
    private readonly _entryService: EntryService,
    private readonly _dialogService: DialogService
  ) {
    super({});
  }
}
