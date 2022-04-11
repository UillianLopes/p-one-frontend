import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'p-one-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
})
export class SignOutComponent implements OnInit {
  constructor(
    private readonly _router: Router,
    private readonly _oidcService: OAuthService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      this._router.navigate(['/']);
    }, 200);
  }
}
