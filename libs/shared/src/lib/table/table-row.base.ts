import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive()
export abstract class TableRowBase {
  constructor(
    protected readonly viewContainerRef: ViewContainerRef,
    public readonly template: TemplateRef<any>
  ) {}
}
