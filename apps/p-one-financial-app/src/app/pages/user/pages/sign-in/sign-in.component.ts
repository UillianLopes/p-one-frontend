import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreFacade } from '@p-one/identity';

@Component({
  selector: 'p-one-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private readonly _router: Router,
    private readonly _userStoreFacade: UserStoreFacade
  ) {}
  ngOnInit(): void {
    this._userStoreFacade.load();
    setTimeout(() => {
      this._router.navigate(['/main']);
    }, 100);
  }
}
