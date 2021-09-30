import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[pOneFlex]',
})
export class FlexDirective {
  @Input('pOneFlex')
  @HostBinding('style.flex')
  flex = '0 0 auto';
}
