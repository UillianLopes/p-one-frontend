import { FormControl } from '@angular/forms';
import { OptionModel } from '@p-one/core';

export interface GetAllUsersForm {
  text: FormControl<string>;
  profiles: FormControl<OptionModel[]>;
}
