import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DestroyableMixin } from '@p-one/shared';
import { AuthenticationStoreFacade, SettingsStoreFacade } from '@p-one/stores/identity';
import { NotificationsStoreFacade } from '@p-one/stores/notifications';
import { skip, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'p-one-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent
  extends DestroyableMixin()
  implements OnInit, OnDestroy
{
  constructor(
    private readonly _notificationsStoreFacade: NotificationsStoreFacade,
    private readonly _settingsStoreFacade: SettingsStoreFacade,
    private readonly _translateService: TranslateService,
    private readonly _authenticationStoreFacade: AuthenticationStoreFacade
  ) {
    super();
  }

  public ngOnInit(): void {
    this._authenticationStoreFacade.load();

    this._notificationsStoreFacade.startNotificationsHub();
    this._notificationsStoreFacade.loadUnreadNotifications();

    this._settingsStoreFacade.settings$
      .pipe(skip(1), takeUntil(this.destroyed$))
      .subscribe((settings) =>
        this._translateService.use(settings?.language ?? navigator.language)
      );

    this._settingsStoreFacade.loadUserSettings();
  }
}
