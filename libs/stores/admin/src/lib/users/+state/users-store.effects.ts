import { Injectable } from '@angular/core';

import { UsersStoreFacade } from './users-store.facade';

@Injectable()
export class UsersStoreEffects {
  constructor(private readonly _facade: UsersStoreFacade) {}
}
