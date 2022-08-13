import { Component, ContentChild, Directive, TemplateRef, ViewEncapsulation } from '@angular/core';

@Directive({
  selector: '[pOneActionsCellOptions]',
})
export class ActionsCellOptionsDirective {
  constructor(public readonly template: TemplateRef<any>) {}
}

@Directive()
abstract class ActionsCellBase {
  @ContentChild(ActionsCellOptionsDirective)
  actionsCellOptions?: ActionsCellOptionsDirective;
}

@Component({
  selector: 'td[p-one-actions-cell]',
  templateUrl: './actions-cell.component.html',
  styleUrls: ['./actions-cell.component.scss'],
  host: {
    class: 'p-one-actions-cell column--fixed-on-right',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ActionsCellComponent extends ActionsCellBase {}

@Component({
  selector: 'th[p-one-actions-cell]',
  templateUrl: './actions-cell.component.html',
  styleUrls: ['./actions-cell.component.scss'],
  host: {
    class: 'p-one-actions-cell column--fixed-on-right',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ActionsHeaderCellComponent extends ActionsCellBase {}
