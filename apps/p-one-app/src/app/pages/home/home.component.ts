import { Component, OnInit } from '@angular/core';

import { UserStoreFacade } from '../../stores/user-store/+state/user-store.facade';

@Component({
  selector: 'p-one-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$ = this._userStoreService.user$;
  
  constructor(private readonly _userStoreService: UserStoreFacade) {}

  ngOnInit(): void {}
}
