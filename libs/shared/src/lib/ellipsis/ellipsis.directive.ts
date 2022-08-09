import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[pOneEllipsis]',
  standalone: true,
})
export class EllipsisDirective {

  @HostBinding('style.text-overflow') public textOverflow = 'ellipsis';
  @HostBinding('style.white-space') public whiteSpace = 'nowrap';
  @HostBinding('style.display') public display = 'block'
  @HostBinding('style.overflow') public overflow = 'hidden';
  @Input() @HostBinding('style.min-width') public minWidth = '0px';
  @Input() @HostBinding('style.width') public width = 'auto';

  constructor() { }

}
