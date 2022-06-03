import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { DestroyableMixin } from '@p-one/shared';
import { takeUntil } from 'rxjs/operators';

import { SettingsStoreFacade } from '../../stores/settings/+state/settings-store.facade';

@Component({
  selector: 'p-one-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent extends DestroyableMixin() implements OnInit {
  public readonly isSettingsLoading$ = this._settingsFacade.isSettingsLoading$;

  public readonly form = this._formBuilder.group({
    language: ['pt-BR'],
    currency: ['BRL'],
    financial: [null],
  });

  constructor(
    private readonly _settingsFacade: SettingsStoreFacade,
    private readonly _formBuilder: UntypedFormBuilder
  ) {
    super();
  }

  public ngOnInit(): void {
    this._settingsFacade.loadUserSettings();
    this._settingsFacade.settings$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((settings) => this.form.patchValue(settings ?? {}));
  }

  public updateSettings() {
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    this._settingsFacade.updateUserSettings(this.form.value);
  }
}
