import { NamedModel } from '@p-one/core';

import { EEntryOperation } from '../enums';

export interface CategoryModel extends NamedModel {
  description?: string;
  id?: string;
  type?: EEntryOperation;
  color?: string;
}
