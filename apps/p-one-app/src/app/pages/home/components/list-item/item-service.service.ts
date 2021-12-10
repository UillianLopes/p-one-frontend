import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ListItemData } from './list-item.data';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private readonly _items: { [name: string]: ListItemData } = {
    '1': { name: 'Uillian', age: 25 },
    '2': { name: 'Rodrigo', age: 25 },
    '3': { name: 'Isabel', age: 25 },
  };

  get(id: string): Observable<ListItemData> {
    return of(this._items[id]).pipe(delay(3000));
  }
}
