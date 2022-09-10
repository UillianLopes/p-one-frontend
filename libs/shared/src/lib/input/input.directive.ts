import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
} from '@angular/core';
import { NgControl, UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { DestroyableMixin } from '../@mixins/destroyable.mixin';

@Directive({
  selector: '[pOneInput]',
  host: {
    '[class.form-control]': 'useFormControl',
  },
})
export class InputDirective
  extends DestroyableMixin()
  implements OnDestroy, OnInit
{
  invalid$?: Observable<boolean | undefined>;

  @HostBinding('disabled') public disabled = false;

  @Input() public useFormControl = true;
  @Input() public selectContentOnClick = false;

  get value(): any {
    if (this._ngControl) {
      return this._ngControl.control?.value;
    }

    if (this._elementRef.nativeElement instanceof HTMLInputElement) {
      return this._elementRef.nativeElement.value;
    }

    if (this._elementRef.nativeElement instanceof HTMLTextAreaElement) {
      return this._elementRef.nativeElement.value;
    }

    if (this._elementRef.nativeElement instanceof HTMLSelectElement) {
      return this._elementRef.nativeElement.value;
    }
  }

  public get isPristine(): boolean | undefined {
    return this._ngControl?.control?.pristine;
  }

  public get isDirty(): boolean | undefined {
    return this._ngControl?.control?.dirty;
  }

  constructor(
    @Optional() protected readonly _ngControl: NgControl,
    protected readonly _renderer2: Renderer2,
    protected readonly _elementRef: ElementRef<HTMLElement>
  ) {
    super();
  }

  public ngOnInit(): void {
    this._setupInvalidValidation();
  }

  public ngOnDestroy() {
    super.ngOnDestroy();
  }

  public markAsPristine(): void {
    this._ngControl?.control?.markAsPristine();
  }

  public markAsDirty(): void {
    this._ngControl?.control?.markAsPristine();
  }

  @HostListener('click') public onClick(): void {
    if (this.selectContentOnClick && this._elementRef.nativeElement instanceof HTMLInputElement) {
      this._elementRef.nativeElement.select();
    }
  }

  private _setupInvalidValidation(): void {
    const control = this._ngControl?.control;
    if (control instanceof UntypedFormControl) {
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
