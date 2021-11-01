import { Component, OnInit } from '@angular/core';

import { UserStoreFacade } from './stores/user-store/+state/user-store.facade';

@Component({
  selector: 'p-one-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly _userStoreService: UserStoreFacade) {}

  ngOnInit(): void {
    this._userStoreService.load();
  }
}
