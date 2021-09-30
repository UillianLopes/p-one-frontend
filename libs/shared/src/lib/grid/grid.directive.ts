import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[pOneGrid]',
  host: {
    '[style.display]': 'grid',
  },
})
export class GridDirective implements OnInit {
  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this._renderer2.setStyle(this._elementRef.nativeElement, 'dipls', '');
  }
}
