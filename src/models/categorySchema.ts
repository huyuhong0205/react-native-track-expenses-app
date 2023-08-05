import { Realm } from '@realm/react';

export default class Category extends Realm.Object<
  Category,
  'categoryName' | 'iconName'
> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();

  categoryName!: string;

  iconName!: string;

  static primaryKey = '_id';

  constructor(realm: Realm, categoryName: string, iconName: string) {
    super(realm, { categoryName, iconName });
  }
}
