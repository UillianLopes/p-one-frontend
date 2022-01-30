import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { uniqueId } from 'lodash';
import { takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../@mixins';
import { HighlightService } from './highlight.service';

@Directive({
  selector: '[pOneHighlightable]',
})
export class HighlightableDirective
  extends DestroyableMixin()
  implements OnInit, OnDestroy
{
  @Input('pOneHighlightable')
  public key: string = uniqueId('highlight');

  constructor(
    private readonly _highlightService: HighlightService,
    private readonly _renderer2: Renderer2,
    private readonly _elementRef: ElementRef<HTMLElement>
  ) {
    super();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnInit(): void {
    this._highlightService
      .isThisKeyHighlighted$(this.key)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isThisKeyHighlighted) => {
        if (isThisKeyHighlighted) this._applyHighlight();
        else this._removeHighlight();
      });
  }

  private _applyHighlight(): void {
    const nativeElement = this._elementRef.nativeElement;
    this._renderer2.setStyle(nativeElement, 'filter', 'grayscale(1)');
    this._renderer2.setStyle(nativeElement, 'opacity', '0.5');
  }

  private _removeHighlight(): void {
    const nativeElement = this._elementRef.nativeElement;
    this._renderer2.setStyle(nativeElement, 'filter', 'grayscale(0)');
    this._renderer2.setStyle(nativeElement, 'opacity', '1');
  }

  @HostListener('click')
  public toggleHighlight() {
    this._highlightService.toggleHighlight(this.key);
  }
}
