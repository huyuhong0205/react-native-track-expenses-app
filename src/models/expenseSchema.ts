import { Realm } from '@realm/react';

export default class Expense extends Realm.Object<
  Expense,
  'title' | 'amount' | 'isExpense' | 'date' | 'categoryId' | 'note'
> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();

  title!: string;

  amount!: number;

  isExpense!: boolean;

  date!: Date;

  categoryId!: Realm.BSON.ObjectId;

  note!: string;

  static primaryKey = '_id';

  constructor(
    realm: Realm,
    title: string,
    amount: number,
    isExpense: boolean,
    date: Date,
    categoryId: Realm.BSON.ObjectId,
    note: string
  ) {
    super(realm, { title, amount, isExpense, date, categoryId, note });
  }
}
