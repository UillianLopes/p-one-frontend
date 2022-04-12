import { Component, ElementRef, Inject, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

import { CONTEXT_MENU_TEMPLATE } from './context-menu.constants';

@Component({
  selector: 'p-one-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit, OnDestroy {
  private readonly _resize$ = new Subject();
  private readonly _resizeObserver = new ResizeObserver(() => {
    this._resize$.next(this._el.nativeElement.getBoundingClientRect());
  });

  public readonly resize$ = this._resize$.asObservable();

  constructor(
    @Inject(CONTEXT_MENU_TEMPLATE) public readonly template: TemplateRef<any>,
    private _el: ElementRef<HTMLElement>
  ) {}
  ngOnDestroy(): void {
    this._resizeObserver.disconnect();
    this._resizeObserver.unobserve(this._el.nativeElement);
  }

  ngOnInit(): void {
    this._resizeObserver.observe(this._el.nativeElement);
  }
}
