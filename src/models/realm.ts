import { createRealmContext } from '@realm/react';

import Category from './categorySchema';
import Expense from './expenseSchema';

export const { RealmProvider, useObject, useQuery, useRealm } =
  createRealmContext({ schema: [Category, Expense] });
