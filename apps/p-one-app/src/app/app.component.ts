import { Component, OnInit } from '@angular/core';

import { UserStoreService } from './stores/user-store/user-store.service';

@Component({
  selector: 'p-one-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly _userStoreService: UserStoreService) {}

  ngOnInit(): void {
    this._userStoreService.load();
  }
}
