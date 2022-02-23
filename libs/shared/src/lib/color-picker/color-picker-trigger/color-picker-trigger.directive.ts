import { Directive, HostListener, Input } from '@angular/core';

import { ColorPickerDirective } from '../color-picker.directive';

@Directive({
  selector: '[pOneColorPickerTrigger]',
})
export class ColorPickerTriggerDirective {
  @Input() public for!: ColorPickerDirective;

  @HostListener('click', ['$event'])
  click($event: MouseEvent) {
    $event.stopPropagation();
    this.for.toggle();
  }
}
