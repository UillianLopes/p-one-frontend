import { TestBed } from '@angular/core/testing';

import { UserStoreFacade } from './+state/user-store.facade';

describe('UserStoreService', () => {
  let service: UserStoreFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStoreFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
