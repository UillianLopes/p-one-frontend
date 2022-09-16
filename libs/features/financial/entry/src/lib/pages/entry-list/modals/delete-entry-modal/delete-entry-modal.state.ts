import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EntryModel, EntryService } from '@p-one/domain/financial';
import { DialogService } from '@p-one/shared';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

export interface DeleteEntryModalData {
  entries?: EntryModel[];
  entry?: EntryModel;
}

export interface DeleteEntryModalState {
  dialogId?: string;
  data: DeleteEntryModalData;
  error?: unknown;
  isLoading?: boolean;
}

@Injectable()
export class DeleteEntryModalStore extends ComponentStore<DeleteEntryModalState> {
  public readonly dialogId$ = this.select((s) => s.dialogId);
  public readonly data$ = this.select((s) => s.data);
  public readonly entries$ = this.select(this.data$, ({ entries }) => entries);

  public readonly entry$ = this.select(this.data$, ({ entry }) => entry);
  public readonly entryId$ = this.select(
    this.entry$,
    (entry) => entry?.id ?? entry?.parentId
  );

  public readonly entriesLength$ = this.select(this.entries$, (entries) =>
    entries ? entries.length : 0
  );

  public readonly willMoreThanOneEntryBeDeleted$ = this.select(
    this.entriesLength$,
    (entriesLength) => entriesLength > 1
  );

  public readonly willOnlyOneEntryBeDeleted$ = this.select(
    this.entriesLength$,
    (entriesLength) => entriesLength === 1
  );

  public readonly entriesTitles$ = this.select(
    this.entries$,
    this.entry$,
    (entries, entry) =>
      (entry && entry.title) ?? (entries && entries.map((e) => e.title))
  );

  public readonly entriesIds$ = this.select(
    this.entries$,
    (entries) => (entries && _.flatMap(entries, ({ id }) => id ?? [])) || []
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
      withLatestFrom(this.entries$, this.entry$),
      tap(() => this.setIsLoading(true)),
      switchMap(([, entries, entry]) => {
        if (entry) {
          const entryId = entry?.id ?? entry?.parentId;

          if (!entryId) {
            return of(null);
          }

          return this._entryService
            .delete(entryId, !entry.id ? entry.dueDate : undefined)
            .pipe(
              withLatestFrom(this.dialogId$),
              tap({
                next: ([, dialogId]) => {
                  this.deleteEntrySuccess();
                  this._dialogService.close(dialogId, true);
                },
                error: (error) => this.deleteEntryFailure(error),
              })
            );
        }

        if (entries) {
          return this._entryService
            .deleteMultiple(_.flatMap(entries, (entry) => entry.id ?? []))
            .pipe(
              withLatestFrom(this.dialogId$),
              tap({
                next: ([_, dialogId]) => {
                  this.deleteEntrySuccess();
                  this._dialogService.close(dialogId, true);
                },
                error: (error) => this.deleteEntryFailure(error),
              })
            );
        }

        return of(null);
      })
    );
  });

  constructor(
    private readonly _entryService: EntryService,
    private readonly _dialogService: DialogService
  ) {
    super({
      data: {},
    });
  }
}
