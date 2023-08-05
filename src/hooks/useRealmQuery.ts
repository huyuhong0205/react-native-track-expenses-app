/* React */
import { useCallback } from 'react';
/* DB */
import { useRealm } from '../models/realm';
import Expense from '../models/expenseSchema';

export default function useRealmQuery() {
  const realm = useRealm();

  const expensesQuery = useCallback(
    (pickedDate: Date, year: number, month: number) => {
      const startDate =
        pickedDate || new Date(`${year}-${String(month).padStart(2, '0')}-01`);
      const endDate = pickedDate
        ? new Date(pickedDate.getTime() + 24 * 60 * 60 * 1000 - 1)
        : new Date(
            new Date(
              `${year}-${String(month + 1).padStart(2, '0')}-01`
            ).getTime() - 1
          );

      const queryExpenses = realm
        .objects(Expense)
        .filtered('date >= $0 && date < $1', startDate, endDate)
        .sorted('date', true);

      return queryExpenses;
    },
    [realm]
  );

  // const asyncExpensesQuery = useCallback(
  //   async (pickedDate: Date | null, year: number, month: number) => {
  //     const startDate =
  //       pickedDate || new Date(`${year}-${String(month).padStart(2, '0')}-01`);
  //     const endDate = pickedDate
  //       ? new Date(pickedDate.getTime() + 24 * 60 * 60 * 1000 - 1)
  //       : new Date(
  //           new Date(
  //             `${year}-${String(month + 1).padStart(2, '0')}-01`
  //           ).getTime() - 1
  //         );

  //     const queryExpenses = await new Promise<
  //       Realm.Results<Expense & Realm.Object<unknown, never>>
  //     >((resolve) => {
  //       const expenses = realm
  //         .objects(Expense)
  //         .filtered('date >= $0 && date < $1', startDate, endDate);
  //       resolve(expenses);
  //     });

  //     return queryExpenses;
  //   },
  //   [realm]
  // );

  return { expensesQuery };
}
