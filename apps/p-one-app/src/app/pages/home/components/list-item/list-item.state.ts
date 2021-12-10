import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ListItemState } from './+state/list-item.reducer';
import { ItemService } from './item-service.service';
import { ListItemData } from './list-item.data';

@Injectable()
export class ListItemStore extends ComponentStore<ListItemState> {
  public readonly item$ = this.select((s) => s.item);

  public readonly loadItem = this.effect((data$: Observable<string>) => {
    return data$.pipe(
      switchMap((id) => {
        return this._itemService.get(id).pipe(
          tap({
            next: (item) => this.loadItemSuccess(item),
            error: (error) => this.loadItemFailure(error),
          })
        );
      })
    );
  });

  public readonly loadItemSuccess = this.updater(
    (state, item: ListItemData) => {
      return {
        ...state,
        item,
      };
    }
  );

  public readonly loadItemFailure = this.updater((state, error: any) => {
    return {
      ...state,
      error,
    };
  });

  constructor(private readonly _itemService: ItemService) {
    super({ isLoading: false });
  }
}
