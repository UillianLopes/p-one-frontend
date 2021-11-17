import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[pOneGridRow]',
})
export class GridRowDirective {
  @Input()
  size?: string;

  constructor() {}
}
