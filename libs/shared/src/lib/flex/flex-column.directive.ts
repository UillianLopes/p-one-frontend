import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[pOneFlexColumn]',
})
export class FlexColumnDirective {
  @HostBinding('[style.display]')
  display = 'flex';

  @HostBinding('[style.flex-direction]')
  flexDirection = 'column';

  @HostBinding('[style.align-items]')
  @Input()
  alignment?: string;

  @HostBinding('[style.justify-content]')
  @Input()
  justification?: string;

  @HostBinding('[style.gap]')
  @Input()
  gap = '0px';
}
