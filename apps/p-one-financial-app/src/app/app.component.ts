import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserStoreFacade } from '@p-one/identity';

@Component({
  selector: 'p-one-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _userStoreService: UserStoreFacade,
    private readonly _translateService: TranslateService,
    @Inject(LOCALE_ID) private readonly _locale: string
  ) {}

  ngOnInit(): void {
    this._userStoreService.load();
    this._translateService.setDefaultLang(this._locale);
  }
}
