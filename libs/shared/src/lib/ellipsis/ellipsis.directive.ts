import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[pOneEllipsis]',
  standalone: true,
})
export class EllipsisDirective {

  @HostBinding('style.text-overflow') public textOverflow = 'ellipsis';
  @HostBinding('style.white-space') public whiteSpace = 'nowrap';
  @HostBinding('style.display') public display = 'block'

  constructor() { }

}
