import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { UsersStoreFacade } from '@p-one/stores/users';

@Component({
  selector: 'p-one-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly _usersStoreFacade: UsersStoreFacade) {}

  ngOnInit(): void {
    this._usersStoreFacade.load();
  }
}
