import { ChangeDetectionStrategy, Component, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, FormGroupDirective, FormGroupName } from '@angular/forms';

@Component({
  selector: 'p-one-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent implements OnInit {
  @Input()
  formGroup!: FormGroup;

  constructor(
    @Optional() private readonly _formGroupName: FormGroupName,
    @Optional() private readonly _formGroupDirective: FormGroupDirective
  ) {}

  ngOnInit(): void {
    if (
      !this._formGroupName &&
      !this._formGroupDirective &&
      !this.formGroup
    ) {
      throw new Error('Please provide an form control, ou form group');
    }

    this.formGroup =
      this.formGroup ??
      this._formGroupName?.control ??
      this._formGroupDirective?.control;
  }
}
