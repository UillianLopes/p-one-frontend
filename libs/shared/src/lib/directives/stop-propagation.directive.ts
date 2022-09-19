import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[pOneStopPropagation]',
})
export class StopPropagationDirective {
  constructor() {}

  @HostListener('click', ['$event']) click($event: MouseEvent): void {
    $event.stopPropagation();
  }
}
