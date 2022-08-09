import { AddressModel } from '../models/address.model';
import { ContactModel } from '../models/contact.model';

export interface CreateUserRequest {
  name: string;
  email: string;
  language: string;
  birthDate: Date;
  profileId: string;

  address: Partial<AddressModel>;
  contacts: ContactModel[];
}
