import { Directive, ElementRef, Inject, Input, OnInit, Optional, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs';

import { DestroyableMixin } from '../../@mixins';
import { Collapsable, COLLAPSE } from '../collapse.component';
import { CollapseStatus } from '../collapse.state';

@Directive({
  selector: '[pOneCollapseIndicator]',
})
export class CollapseIndicatorDirective
  extends DestroyableMixin()
  implements OnInit
{
  @Input() public collapseOpenedClass = 'p-one-collapse--opened';
  @Input() public collapseClosedClass = 'p-one-collapse--closed';

  @Input() public collapsable?: Collapsable;

  constructor(
    private readonly _renderer2: Renderer2,
    private readonly _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(COLLAPSE) private readonly _collapsable?: Collapsable
  ) {
    super();
  }

  public ngOnInit(): void {
    const collapsable = this._collapsable ?? this.collapsable;

    if (collapsable) {
      collapsable.status$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((value) => {
          switch (value) {
            case CollapseStatus.OPENED:
              this._renderer2.removeClass(
                this._elementRef.nativeElement,
                this.collapseClosedClass
              );
              this._renderer2.addClass(
                this._elementRef.nativeElement,
                this.collapseOpenedClass
              );
              break;

            case CollapseStatus.CLOSED:
              this._renderer2.removeClass(
                this._elementRef.nativeElement,
                this.collapseOpenedClass
              );
              this._renderer2.addClass(
                this._elementRef.nativeElement,
                this.collapseClosedClass
              );
              break;
          }
        });
    }
  }
}
