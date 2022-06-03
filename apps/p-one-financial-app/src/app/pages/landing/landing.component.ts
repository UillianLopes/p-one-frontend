import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserStoreFacade } from '@p-one/identity';
import { DestroyableMixin } from '@p-one/shared';
import { startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'p-one-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent extends DestroyableMixin() implements OnInit {
  public readonly languageControl = new UntypedFormControl(this._locale);

  public readonly language$ = this.languageControl.valueChanges.pipe(
    startWith(this.languageControl.value)
  );

  constructor(
    @Inject(LOCALE_ID) private readonly _locale: string,
    private readonly _userFacade: UserStoreFacade,
    private readonly _translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this._translateService.use(this._locale);
    this.language$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((language) => this._translateService.use(language));
  }

  public signIn(): void {
    this._userFacade.signIn();
  }
}
