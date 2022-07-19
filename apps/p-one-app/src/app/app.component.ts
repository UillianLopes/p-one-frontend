import { Component, OnInit } from '@angular/core';
import { AuthenticationStoreFacade } from '@p-one/stores/identity';

@Component({
  selector: 'p-one-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _authenticationStoreFacade: AuthenticationStoreFacade
  ) {}

  ngOnInit(): void {
    this._authenticationStoreFacade.load();
  }
}
