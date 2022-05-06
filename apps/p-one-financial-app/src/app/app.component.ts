import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsStoreFacade } from '@p-one/admin';
import { UserStoreFacade } from '@p-one/identity';
import { DestroyableMixin } from '@p-one/shared';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'p-one-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends DestroyableMixin() implements OnInit {
  constructor(
    private readonly _userStoreFacade: UserStoreFacade,
    private readonly _translateService: TranslateService,
    private readonly _settingsStoreFacade: SettingsStoreFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this._userStoreFacade.load();
    this._settingsStoreFacade.settings$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((settings) =>
        this._translateService.use(settings?.language ?? 'en')
      );
  }
}
