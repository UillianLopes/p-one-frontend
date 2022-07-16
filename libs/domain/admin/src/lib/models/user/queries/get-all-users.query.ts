import { QueryModel } from '@p-one/core';

export interface GetAllUsersQuery extends QueryModel {
  text: string;

  profileIds: string[];
}
