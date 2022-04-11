import { Component, OnInit } from '@angular/core';
import { UserStoreFacade } from '@p-one/identity';

@Component({
  selector: 'p-one-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private readonly _userFacade: UserStoreFacade) {}

  ngOnInit(): void {}

  public signIn(): void {
    this._userFacade.signIn();
  }
}
