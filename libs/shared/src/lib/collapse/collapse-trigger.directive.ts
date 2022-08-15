import { Directive, HostBinding, HostListener, Inject, Input, Optional } from '@angular/core';

import { Collapsable, COLLAPSE } from './collapse.component';

@Directive({
  selector: '[pOneCollapseTrigger]',
})
export class CollapseTriggerDirective {
  @HostBinding('style.cursor')
  public cursor = 'pointer';

  @Input() public collapsable?: Collapsable;
  constructor(
    @Optional() @Inject(COLLAPSE) private readonly _collapsable?: Collapsable
  ) {}

  @HostListener('click')
  public click(_: MouseEvent) {
    (this._collapsable ?? this.collapsable)?.toggle();
  }
}
