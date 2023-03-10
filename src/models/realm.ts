import { createRealmContext } from '@realm/react';

import Category from './categorySchema';

export const { RealmProvider, useObject, useQuery, useRealm } =
  createRealmContext({ schema: [Category] });
