import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { EntryFilter, EntryModel } from '../../../models';
import { EntryRecurrence } from '../../../models/enums/entry-recurrence.enum';
import { EntryType } from '../../../models/enums/entry-type.enum';

@Injectable()
export class EntryService {
  constructor(private readonly _httpClient: HttpClient) {}

  private readonly _mock: EntryModel[] = [
    {
      type: EntryType.Credit,
      recurrence: EntryRecurrence.Every15Days,
      value: 200.0,
      fees: 0,
      fine: 0,
      title: 'Teste numero 1',
      description: '',
      category: 'Cartão de crédito',
      subCategory: 'Alimentação',
    },
    {
      type: EntryType.Debit,
      recurrence: EntryRecurrence.Every15Days,
      value: 200.0,
      fees: 0,
      fine: 0,
      title: 'Teste numero 1',
      description: '',
      category: 'Cartão de crédito',
      subCategory: 'Alimentação',
    },
  ];

  get(filter: Partial<EntryFilter>): Observable<EntryModel[]> {
    return of([...this._mock]).pipe(delay(1000));
  }
}
