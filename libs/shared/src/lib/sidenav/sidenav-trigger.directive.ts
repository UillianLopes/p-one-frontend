import { Directive, HostListener } from '@angular/core';

import { SidenavFacade } from './+state/sidenav.facade';

@Directive({
  selector: '[pOneSidenavTrigger]',
})
export class SidenavTriggerDirective {
  constructor(private readonly _sidenavFacade: SidenavFacade) {}

  @HostListener('click')
  public toggle(): void {
    this._sidenavFacade.toggle();
  }
}
