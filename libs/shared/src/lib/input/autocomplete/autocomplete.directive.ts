import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterContentInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Optional,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { eventOutsideOverlay } from '../../oprators';
import { InputDirective } from '../input.directive';
import { AutocompleteComponent } from './autocomplete.component';

@Directive({
  selector: 'input[pOneAutocomplete]',
})
export class AutocompleteDirective
  extends InputDirective
  implements OnInit, AfterContentInit
{
  @Input('pOneAutocomplete')
  public autocomplete!: AutocompleteComponent;

  @Input()
  public clearAfterSelect = false;

  private _overlayRef?: OverlayRef;

  constructor(
    @Optional() ngControl: NgControl,
    renderer2: Renderer2,
    elementRef: ElementRef<HTMLInputElement>,
    private readonly _overlay: Overlay,
    private readonly _viewContainerRef: ViewContainerRef
  ) {
    super(ngControl, renderer2, elementRef);
  }

  ngAfterContentInit(): void {
    if (this.value) {
      (this._elementRef.nativeElement as HTMLInputElement).value = this
        .autocomplete.displayFn
        ? this.autocomplete.displayFn(this.value)
        : this.value ?? '';
    }
  }

  ngOnInit(): void {
    this.autocomplete
      .valueChange
      .pipe(takeUntil(this.destroyed$))
      .subscribe((obj) => {
        this.value = obj;
        this.close();
      });

    const control = this._ngControl?.control;

    if (control) {
      control
        .valueChanges
        .pipe(takeUntil(this.destroyed$))
        .subscribe((obj) => this._applyValueToDOM(obj));
    } else {
      this.value$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((obj) => this._applyValueToDOM(obj));
    }
  }

  close() {
    this._overlayRef?.detach();
    this._overlayRef = undefined;
  }

  @HostListener('focus')
  open() {
    if (this._overlayRef) {
      return;
    }

    const template = this.autocomplete.template;

    if (!template) {
      return;
    }

    const overlayRef = this._overlay.create({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._elementRef.nativeElement)
        .withPositions([
          {
            overlayX: 'start',
            originX: 'start',
            overlayY: 'top',
            originY: 'bottom',
          },
          {
            overlayX: 'start',
            originX: 'start',
            overlayY: 'bottom',
            originY: 'top',
          },
        ]),
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      width: `${
        this._elementRef.nativeElement.getBoundingClientRect().width
      }px`,
    });

    const templatePortal = new TemplatePortal(template, this._viewContainerRef);

    overlayRef.attach(templatePortal);

    eventOutsideOverlay('click', overlayRef, this._elementRef.nativeElement)
      .pipe(takeUntil(overlayRef.detachments()))
      .subscribe(() => {
        this.close();
      });

    this._overlayRef = overlayRef;
  }

  @HostListener('keydown')
  onKeyDown() {
    this.open();
  }

  @HostListener('click')
  onClick() {
    this.open();
  }

  private _applyValueToDOM(obj: any) {
    const element = this._elementRef.nativeElement as HTMLInputElement;

    if (!this.clearAfterSelect) {
      if (typeof obj === 'string') {
        element.value = obj;
      } else if (obj) {
        element.value = this.autocomplete.displayFn
          ? this.autocomplete.displayFn(obj)
          : JSON.stringify(obj);
      } else {
        element.value = '';
      }
    } else {
      (this._elementRef.nativeElement as HTMLInputElement).value = '';
    }
  }
}

@Directive({
  selector: 'input[pOneSmallAutocomplete]',
})
export class SmallAutocompleteDirective extends AutocompleteDirective {
  @Input('pOneSmallAutocomplete')
  public autocomplete!: AutocompleteComponent;
}
