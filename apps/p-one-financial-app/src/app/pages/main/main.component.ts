import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsStoreFacade } from '@p-one/admin';
import { UserStoreFacade } from '@p-one/identity';
import { NotificationsStoreFacade } from '@p-one/notification';
import { DestroyableMixin } from '@p-one/shared';
import { skip, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'p-one-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent extends DestroyableMixin() implements OnInit {
  public readonly user$ = this._userStoreFacade.user$;

  constructor(
    private readonly _userStoreFacade: UserStoreFacade,
    private readonly _notificationsStoreFacade: NotificationsStoreFacade,
    private readonly _settingsStoreFacade: SettingsStoreFacade,
    private readonly _translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this._userStoreFacade.load();
    this._notificationsStoreFacade.startNotificationsHub();
    this._notificationsStoreFacade.loadUnreadNotifications();
    this._settingsStoreFacade.settings$
      .pipe(skip(1), takeUntil(this.destroyed$))
      .subscribe((settings) =>
        this._translateService.use(settings?.language ?? navigator.language)
      );

    this._settingsStoreFacade.loadUserSettings();
  }

  signOut(): void {
    this._userStoreFacade.signOut();
  }
}
