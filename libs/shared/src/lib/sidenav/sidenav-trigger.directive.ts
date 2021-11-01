import { Directive, HostListener } from '@angular/core';
import { delay } from 'rxjs/operators';

import { SidenavFacade } from './+state/sidenav.facade';

@Directive({
  selector: '[pOneSidenavTrigger]',
  exportAs: 'pOneSidenavTrigger',
})
export class SidenavTriggerDirective {
  readonly state$ = this._sidenavFacade.state$.pipe(delay(10));

  constructor(private readonly _sidenavFacade: SidenavFacade) {}

  @HostListener('click')
  public toggle(): void {
    this._sidenavFacade.toggle();
  }
}
