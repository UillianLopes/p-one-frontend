import { Directive, ElementRef, Optional } from '@angular/core';

import {
  AutocompleteDirective,
  InputDirective,
  LargeInputDirective,
  SmallAutocompleteDirective,
  SmallInputDirective,
} from '../input';

@Directive({
  selector: '[pOneDetailsInput]',
})
export class DetailsInputDirective {
  get isPristine(): boolean | undefined {
    return this.input?.isDirty;
  }

  get isDirty(): boolean | undefined {
    return this.input?.isDirty;
  }

  get input(): InputDirective {
    return (
      this._input ??
      this._smallInput ??
      this._largeInput ??
      this._autocomlete ??
      this._smallAutocomlete
    );
  }
  constructor(
    @Optional() private readonly _input: InputDirective,
    @Optional() private readonly _smallInput: SmallInputDirective,
    @Optional() private readonly _largeInput: LargeInputDirective,
    @Optional() private readonly _autocomlete: AutocompleteDirective,
    @Optional() private readonly _smallAutocomlete: SmallAutocompleteDirective,
    private readonly _elementRef: ElementRef<HTMLInputElement>
  ) {}

  markAsPristine(): void {
    this.input?.markAsPristine();
  }

  enableField(): void {
    if (this.input) {
      this.input.disabled = false;
    }
    this._elementRef.nativeElement.focus();
  }

  disabledField(): void {
    if (this.input) {
      this.input.disabled = true;
    }
  }
}
