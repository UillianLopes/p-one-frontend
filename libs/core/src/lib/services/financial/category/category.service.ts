import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { v4 } from 'uuid';

import { CategoryModel } from '../../../models';

@Injectable()
export class CategoryService {
  constructor() {}

  private _mock: CategoryModel[] = [
    { id: v4(), name: 'Contas de casa', description: '' },
    { id: v4(), name: 'Gastos futeis', description: '' },
    { id: v4(), name: 'Emergências', description: '' },
    { id: v4(), name: 'Gastos médicos', description: '' },
    { id: v4(), name: 'Streaming', description: '' },
  ];

  get(): Observable<CategoryModel[]> {
    return of([...this._mock]).pipe(delay(7000));
  }
}
