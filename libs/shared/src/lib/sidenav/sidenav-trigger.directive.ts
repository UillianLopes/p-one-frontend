import { Directive, HostListener } from '@angular/core';
import { delay } from 'rxjs/operators';

import { SidenavStore } from './sidenav.state';

@Directive({
  selector: '[pOneSidenavTrigger]',
  exportAs: 'pOneSidenavTrigger',
})
export class SidenavTriggerDirective {
  readonly state$ = this._sidenavStore.state$.pipe(delay(10));

  constructor(private readonly _sidenavStore: SidenavStore) {}

  @HostListener('click')
  public toggle(): void {
    this._sidenavStore.toggle();
  }
}
