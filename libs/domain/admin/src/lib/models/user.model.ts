import { OptionModel } from '@p-one/core';

import { ContactModel } from './contact.model';

export interface UserModel {
  id: string;
  name: string;
  email: string;
  birthDate: Date;

  profile: OptionModel;
  account: OptionModel;

  contacts: ContactModel[];
}
