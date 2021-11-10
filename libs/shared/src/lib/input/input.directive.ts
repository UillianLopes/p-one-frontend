import { Directive, ElementRef, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../@mixins/destroyable.mixin';

@Directive({
  selector: '[pOneInput]',
  host: {
    class: 'form-control',
  },
})
export class InputDirective
  extends DestroyableMixin()
  implements OnDestroy, OnInit
{
  invalid$?: Observable<boolean | undefined>;

  constructor(
    @Optional() private readonly _ngControl: NgControl,
    private readonly _renderer2: Renderer2,
    private readonly _elementRef: ElementRef<HTMLElement>
  ) {
    super();
  }

  ngOnInit(): void {
    this._setupInvalidValidation();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  private _setupInvalidValidation(): void {
    const control = this._ngControl?.control;
    if (control instanceof FormControl) {
      this.invalid$ = control.statusChanges.pipe(
        map((status) => status === 'INVALID')
      );

      if (this.invalid$) {
        this.invalid$.pipe(takeUntil(this.destroyed$)).subscribe((invalid) => {
          const classList = this._elementRef.nativeElement.classList;

          if (invalid) {
            if (classList.contains('is-invalid')) {
              return;
            }

            this._renderer2.addClass(
              this._elementRef.nativeElement,
              'is-invalid'
            );
          } else {
            if (!classList.contains('is-invalid')) {
              return;
            }
            this._renderer2.removeClass(
              this._elementRef.nativeElement,
              'is-invalid'
            );
          }
        });
      }
    }
  }
}
@Directive({
  selector: '[pOneSmallInput]',
  host: {
    class: 'form-control form-control-sm',
  },
})
export class SmallInputDirective extends InputDirective {}

@Directive({
  selector: '[pOneLargeInput]',
  host: {
    class: 'form-control form-control-lg',
  },
})
export class LargeInputDirective extends InputDirective {}
