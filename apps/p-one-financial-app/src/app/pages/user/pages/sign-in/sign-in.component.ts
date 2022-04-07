import { Component, OnInit } from '@angular/core';
import { UserStoreFacade } from '@p-one/identity';

@Component({
  selector: 'p-one-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(private readonly _userStoreFacade: UserStoreFacade) {}

  ngOnInit(): void {
    setTimeout(() => {
      this._userStoreFacade.signIn();
    }, 100)
    
  }
}
