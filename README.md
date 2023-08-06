# React native expense tracking app

A mobile app build with react native for expense tracking.

**I don't have any Mac OS or iOS devices, so I'm only testing on Android.**

## Technic

- Typescript
- React
- React native
- Expo
- Realm

## Project Structure

```
PROJECT_ROOT
├── assets              # static assets
└── src
    ├── assets          # assets
    ├── atoms           # Basic ui components
    ├── components      # React components
    ├── hooks           # custom hooks
    ├── models          # Realm database model
    ├── screens         # screen files
    ├── types           # typescript types
    └── utils           # utility functions
```

## Overview

### Categories screen

https://github.com/huyuhong0205/react-native-track-expenses-app/assets/114565048/31d37ae0-5879-48c4-be17-95b3896636da

- Add, edit and delete category.
- Can choose category icon.
- All categories are stored in the Realm local database.

### Expenses screen

https://github.com/huyuhong0205/react-native-track-expenses-app/assets/114565048/d96f076e-d71d-4455-85e0-34458d8b508e

- Display expenses, you can filter expenses by day with just a click on the calendar.
- Click expense to edit expense.
- Click the plus icon in the bottom right corner to add a new expense.
- All categories are stored in the Realm local database.

### Expense form screen

https://github.com/huyuhong0205/react-native-track-expenses-app/assets/114565048/36c94b6e-976e-45da-9ad5-d6282cb419e5

- You can input the amount directly or use a custom calculator for calculations.
- You can choose whether it's an expense or income.
- Use the native date and time picker to select the expense time.
- Click the trash can icon in the top right corner to delete expense.

### Light mode and dark mode

https://github.com/huyuhong0205/react-native-track-expenses-app/assets/114565048/512f607a-47dc-4e0a-8da6-029894f7851c

- You can switch between light mode and dark mode. This setting will be stored in react async storage and loaded upon app startup.

## Test this app

- Download apk from `./APK/RN-expense-tracking_v1.0.0_build-2023-03-24.apk` in this repo.
- Or you can clone this repo and setup your development environment follow [react native official doc](https://reactnative.dev/docs/environment-setup) then run scripts from `package.json`.

## Libraries

- [react](https://react.dev/)
- [react-native](https://reactnative.dev/)
- [expo](https://expo.dev/) - An open-source platform for making universal native apps for Android, iOS.
- [realm](https://realm.io/) - Cross platform NoSQL local database.
- [react-native-calendars](https://www.npmjs.com/package/react-native-calendars) - Customizable react native calendar components.
- [native-base](https://nativebase.io/) - An accessible, utility-first component library that helps you build consistent UI across Android, iOS and Web.
- [@react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage) - An asynchronous, unencrypted, persistent, key-value storage system for react native.
- [@react-native-community/datetimepicker](https://www.npmjs.com/package/@react-native-community/datetimepicker) - React native date & time picker component for iOS, Android and Windows.
- [@react-navigation/native](https://reactnavigation.org/docs/getting-started/) - Navigation between different screens.
- [@expo/vector-icons]() - A library it includes popular icon sets, and allow us to create own icon set using icon fonts.
- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
- [eslint-config-airbnb-typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript)
