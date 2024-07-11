# Code Style Guide for the frontend of SEMPER-KI

This style guide is more of a "I think this can work" than a hard rule set. Take it with a grain of salt please! There are also some How-To's here, hope it helps.

## Table of Content

- [Code Style Guide for the frontend of SEMPER-KI](#code-style-guide-for-the-frontend-of-semper-ki)
  - [Table of Content](#table-of-content)
  - [Folder Structure](#folder-structure)
  - [Naming](#naming)
  - [Components](#components)
  - [Package.json](#packagejson)
    - [Script](#scripts)
  - [Internationalization](#internationalization)
  - [Testing](#testing)

## General

this app uses `TypeScript`. this means that every variable should be typed.

## Folder Structure

- `frontend` Contains docker files, .env file, package.json, tailwind.config.ts, vite.config.ts, other config files and files necessary for git.
  - `__mocks__` Contains mocks for testing
  - `assets` Contains all assets for the App like fonts, icons, images, locals (translations-files) and 3D-test-files
  - `component-library` Contains components that can be used in other projects without changing them. for Example: Buttons, Typography, Divider, Formcomponents etc.
    - `index.ts` this file exports all Components
  - `nginx` Contains config-file for the Nginx-Server for Docker Builds
  - `public` Contains public files for Frontend like favicon, manifest.json, robots.txt, etc.
  - `src` Contains all source code for the App and i18n init file, index.css, index.tsx etc.
    - `api` Contains the custom axios instance and all api calls
    - `components` Contains all platform dependent components
    - `config` Contains static values
    - `context` Contains als context provider
    - `data` Contains all constant data values like navigation-items and other constants
    - `hooks` Contains all general Hooks that are used in the App
    - `outlets` Contains all outlets that are not for routing
    - `pages` Contains all pages off the App
      - every page folder should represent an actual page on the app execpt the `App` folder
      - `App` Contains the routing to all Pages
      - Structure of an Example Page:
      - `PageName` Name of the Page
        - `SubPageName` Subpage of Projects
        - `components` Page specific components
        - `context` Page specific contexts
        - `hooks` Page specific hooks
        - `PageName.tsx` main Component for this Page
    - `routeOutlets` Contains all outlets for routing
    - `routes` Contains all external routing files that are not in the App.tsx
    - `service` Contains some utility functions
    - `types` Contains some general types
  - `test` Contains files for Unit test like userBuilder, modelBuilde etc. and a render setup
  - `types` Contains i18next types. This is used for typesafe Translations

## Naming

- `types` / `interface` PascalCase e.g: `UserProps`
- `components` PascalCase e.g: `Button`
- `variables` camelCase e.g: `isActive`
- `functions` camelCase e.g: `handleOnClickButton`
- `hooks` startin with use and the name. e.g: `useUser`

## Components

components are in the most times `FunctionalComponents` and have the following structure

```
import ...

interface ComponentNameProps {}

const ComponentName: React.FC<ComponentNameProps> = (props) => {
    const {...} = props;

    return (<></>)
}

export default ComponentName;
```

hooks have the following structure

```
import ...

interface useHookNameProps {
  functionName(): void;
}

const useHookName = (): useHookNameProps => {
  const functionName = () => {}

  return { functionName};
};

export default useHookName;
```

## Package.json

the package.json contains all packages and dev packages with version numbers and the starting script

### scripts

- `"start": "vite"`
  - starting the dev server with `yarn start`
- `"build": "tsc && vite build"`
  - manually building the app with `yarn build`
- `"serve": "vite preview --port 3000"`
  - manually serving the app with `yarn serve`
- `"test": "jest --coverage --ci --reporters=default --reporters=jest-junit"`
  - running the tests with `yarn test`
- `"test:ci": "jest --ci --reporters=default && tsc && vite build"`
  - running jest tests + typescript tests + building with `yarn test:ci` (used in CI)

## Internationalization

this app uses i18next as Internationalization package

- the package is initialized in the `src/i18n.ts`
- the translation files are located in `assets/locals/`
- there is a german and english `tranlation.json`
- the app has typescript support for the translation files
  - it throws an error when the key is not valid
- the fallback language is german
  - if an english key is not found it look in the german file
- structure of `tranlation.json`
  - the german and english `tranlation.json` should have the same structure
  - ```
      {
          "key1":"value1",
          "key2":"value2",
          "key3":{
              "key4":"value4",
              "key5:{
                  "key6":"value6
                  ...
              }
              ...
          }
          ...
      }
    ```
- usage
  - import the translation hook
    - `import { useTranslation } from "react-i18next";`
  - use this inside of the component
    - `const { t } = useTranslation();`
  - enter key into t funtion to display text
    - `<Text>{t("key3.key5.key6")}</Text>` => `<Text>value6</Text>`

## Testing

- `jest` is used for the unit test
- the test are always named `ComponentName.spec.tsx`
- the test file lays next to the component that is tested
- the test files should have the following structure
  - ```
    import ...
    describe("<ComponentName>", () => {
        it.("should render without crashing", () => {
            render(<ComponentName />);
            expect(true).toBeTruthy();
        });
    });
    ```
