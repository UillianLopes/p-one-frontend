import { Component, OnInit } from '@angular/core';

import { UserStoreFacade } from '../../stores/user-store/+state/user-store.facade';

@Component({
  selector: 'p-one-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public readonly user$ = this._userStoreService.user$;

  constructor(private readonly _userStoreService: UserStoreFacade) {}

  ngOnInit(): void {}
}
