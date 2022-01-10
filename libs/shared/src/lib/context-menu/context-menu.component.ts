import { Component, ElementRef, Inject, OnInit, TemplateRef } from '@angular/core';

import { observeResize$ } from '../oprators';
import { CONTEXT_MENU_TEMPLATE } from './context-menu.constants';

@Component({
  selector: 'p-one-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit {
  readonly resize$ = observeResize$(this._el.nativeElement);

  constructor(
    @Inject(CONTEXT_MENU_TEMPLATE) public readonly template: TemplateRef<any>,
    private _el: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.resize$.subscribe();
  }
}
