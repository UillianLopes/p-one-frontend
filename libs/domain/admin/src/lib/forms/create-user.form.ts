import { FormControl, FormGroup } from '@angular/forms';
import { OptionModel } from '@p-one/core';

import { AddressForm } from './address.form';

export interface CreateUserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  birthDate: FormControl<string>;
  profile: FormControl<OptionModel>;
  address: FormGroup<AddressForm>;
}

