import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { UserStoreService } from '../../../../stores/user-store/user-store.service';

@Component({
  selector: 'p-one-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _oidcService: OidcSecurityService,
    private readonly _router: Router,
    private readonly _userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this._userStoreService.authorize();
  }

  login() {
    this._oidcService.authorize();
  }
}
