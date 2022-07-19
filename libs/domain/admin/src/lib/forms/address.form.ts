import { FormControl } from '@angular/forms';

export interface AddressForm {
  number: FormControl<string>;
  street: FormControl<string>;
  district: FormControl<string>;
  city: FormControl<string>;
  state: FormControl<string>;
  country: FormControl<string>;
  zipCode: FormControl<string>;
}

