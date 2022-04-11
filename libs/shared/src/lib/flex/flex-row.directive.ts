import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[pOneFlexRow]'
})
export class FlexRowDirective {
  @HostBinding('style.display')
  display = 'flex';

  @HostBinding('style.flex-direction')
  flexDirection = 'row';

  @HostBinding('style.align-items')
  @Input()
  alignment?: string;

  @HostBinding('style.justify-content')
  @Input()
  justification?: string;

  @HostBinding('style.gap')
  @Input()
  gap = '0px';

}
