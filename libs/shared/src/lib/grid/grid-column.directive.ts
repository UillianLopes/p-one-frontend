import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[pOneGridColumn]',
})
export class GridColumnDirective {
  @Input('pOneGridColumn')
  size?: string;

  constructor() {}
}
