import { Directive, HostBinding, Optional } from '@angular/core';

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

  @HostBinding('disabled') public disabled = false;

  constructor(
    @Optional() private readonly _input: InputDirective,
    @Optional() private readonly _smallInput: SmallInputDirective,
    @Optional() private readonly _largeInput: LargeInputDirective,
    @Optional() private readonly _autocomlete: AutocompleteDirective,
    @Optional() private readonly _smallAutocomlete: SmallAutocompleteDirective
  ) {}

  markAsPristine(): void {
    this.input?.markAsPristine();
  }

  enableField(): void {
    if (this.input) {
      this.disabled = false;
      setTimeout(() => this.input.focus());
    }
  }

  disabledField(): void {
    if (this.input) {
      this.disabled = true;
    }
  }
}
