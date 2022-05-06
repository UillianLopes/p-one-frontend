import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserStoreFacade } from '@p-one/identity';
import { DestroyableMixin } from '@p-one/shared';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'p-one-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent extends DestroyableMixin() implements OnInit {
  public readonly languageControl = new FormControl(navigator.language ?? 'en');
  constructor(
    private readonly _userFacade: UserStoreFacade,
    private readonly _translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this._translateService.use(navigator.language ?? 'en');
    this.languageControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((language) => this._translateService.use(language));
  }

  public signIn(): void {
    this._userFacade.signIn();
  }
}
