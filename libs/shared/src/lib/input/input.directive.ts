import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
} from '@angular/core';
import { NgControl, UntypedFormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
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

  @Input() public useFormControl = true;
  @Input() public selectContentOnClick = false;

  @Output() readonly valueChange = new EventEmitter<any>();

  public readonly value$ = new BehaviorSubject<any>(null);

  get value(): any {
    if (this._ngControl) {
      return this._ngControl.control?.value;
    }

    return this.value$.value;
  }

  @Input()
  set value(value: any) {
    if (this._ngControl) {
      this._ngControl.control?.setValue(value);
    } else {
      this.value$.next(value);
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

  public focus(): void {
    console.log(this._elementRef.nativeElement);
    this._elementRef.nativeElement.focus({
      preventScroll: true,
    });
  }

  @HostListener('click') public onClick(): void {
    if (
      this.selectContentOnClick &&
      this._elementRef.nativeElement instanceof HTMLInputElement
    ) {
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
