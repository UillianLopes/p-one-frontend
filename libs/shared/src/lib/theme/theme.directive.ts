import { Directive, Inject, Input, OnInit, Optional, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs';

import { DestroyableMixin } from '../@mixins';
import { THEME_CONFIG, ThemeConfig } from './theme.config';
import { ThemeStore } from './theme.state';

@Directive({
  selector: '[pOneTheme]',
  providers: [ThemeStore],
})
export class ThemeDirective extends DestroyableMixin() implements OnInit {
  @Input() set theme(theme: string) {
    this._store.setTheme(theme);
  }

  constructor(
    private readonly _renderer2: Renderer2,
    private readonly _store: ThemeStore,
    @Optional() @Inject(THEME_CONFIG) themeConfig: ThemeConfig
  ) {
    super();
    this._store.setThemeConfig(themeConfig);
  }

  ngOnInit(): void {
    this._store.theme$.pipe(takeUntil(this.destroyed$)).subscribe((theme) => {
      if (!theme) {
        return;
      }
      const entries = Object.entries(theme);
      for (const [key, value] of entries) {

        document.body.style.setProperty(key, value);
      }

      console.log(entries);
    });
  }
}
