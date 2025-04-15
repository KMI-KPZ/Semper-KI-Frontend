#  Semper-KI: Frontend

<p style="text-align: center;">
  <a href="https://semper-ki.org/">
    <img src="public/logo192.png" alt="logo" width="130" height="130">
  </a>
</p>


## 🔍 Project Overview

### Short Description

The Semper-KI Frontend acts as a platform where users can submit their 3D printing requirements and find suitable service providers. 
It leverages artificial intelligence to optimize the matching process by considering factors such as material properties, printing technology, 
pricing, and delivery options. The user-friendly interface allows users to easily navigate, submit their requirements, and track order progress, 
streamlining the process of connecting supply and demand in the 3D printing industry.

### Live Demo/Preview

[Semper-KI Live Demo](https://semper-ki.org/)

(Note: This is a science project, and the demo may not be available later on.)

### Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, MUI, Three.js
- **State Management**: tanstack query, useContext
- **Forms**: React Hook Form
- **3D & Visualization**: Three.js, D3
- **Internationalization**: i18next
- **Testing**: Jest, Testing Library
- **Code Quality**: ESLint, Prettier
- **Bundler**: Vite
- **Containerization**: Docker

## 📚 Table of Contents

1. [Getting Started](#-Getting-Started)
2. [Development](#-Development)
3. [Deployment](#-Deployment)
4. [Best Practices](#-Best-Practices)
5. [License](#-License)


## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- `Node.js`: v18.12.0
- `Yarn`: v1.22.19
- `npm`: v8.19.2
- `Docker`: Latest version

### Installation

Clone the repository:

```bash
git clone git@github.com:KMI-KPZ/Frontend.git
cd Frontend
```

Install dependencies:

```bash
yarn install
```

### Environment Variables

The following environment variables are required in a `.env` file:

```bash
VITE_HTTP_API_URL='http://127.0.0.1:8000'
VITE_WS_API_URL='ws://127.0.0.1:8000'
VITE_RESILIENCE='http://127.0.0.1:3010'
VITE_MATURITY='http://127.0.0.1:3020'
```

### Running the Development Server

To start the development server, run:

```bash
yarn start
```

## 🛠️ Development

### Connection to Backend

The Semper-KI Frontend is designed to connect to the [Semper-KI Backend](https://github.com/KMI-KPZ/Semper-KI-Backend). Please refer to the documentation of the Semper-KI Backend for instructions on how to set up and configure the backend.

### Scripts

The following scripts can be run using `yarn <scriptname>`. For example, to start the development server, use `yarn start`.
All scripts can be found in the [package.json](https://github.com/KMI-KPZ/Semper-KI-Frontend/blob/main/package.json).

Script names:

- **start**: Starts the development server using Vite.
  
  ```
  vite
  ```

- **build**: Compiles TypeScript and builds the project using Vite.
  
  ```
  tsc && vite build
  ```

- **serve**: Serves the built project using Vite on port 3000.
  
  ```
  vite preview --port 3000
  ```

- **test**: Runs tests with Jest, including coverage and CI reporting.
  
  ```
  jest --coverage --ci --reporters=default --reporters=jest-junit
  ```

- **test:ci**: Runs tests with Jest in CI mode, compiles TypeScript, and builds the project. (used in GitHub Action)
  
  ```
  jest --ci --reporters=default && tsc && vite build
  ```

- **doc**: Generates documentation using TypeDoc.
  
  ```
  typedoc --options typedoc.json
  ```

The server will be running at: [http://127.0.0.1:3000/](http://127.0.0.1:3000/)

### TypeDoc

You can generate technical documentation using TypeDoc with the following command:

```bash
yarn doc
```

This command generates a documentation overview in the `.doc` folder. 
You can view the documentation by opening the `index.html` file in a web browser.

This technical documentation is based on the types, classes, interfaces and JSDoc comments in the code.

### 🗃️ Folder Structure

```bash
.
├── assets                   # Static assets like fonts, icons, images, and localization files
│   ├── fonts                # Font files used in the project
│   ├── icons                # Icon files used in the project
│   ├── images               # Image files used in the project
│   │   ├── partner          # Partner-related images
│   │   └── nru              # NRU-related images
│   ├── locals               # Localization files
│   │   ├── en-US            # English localization files
│   │   └── de-DE            # German localization files
│   └── test                 # Test assets
├── component-library        # Shared component library
├── nginx                    # Nginx configuration files
├── public                   # Public assets served directly
├── test                     # Test files and utilities
├── types                    # TypeScript type definitions
├── src                      # Source code
│   ├── api                  # API modules
│   │   ├── [Modules]        # Specific API modules
│   │   │   ├── Queries      # API query functions
│   │   │   └── Mutations    # API mutation functions
│   │   ...
│   ├── components           # Reusable components
│   ├── config               # Configuration files
│   ├── contexts             # React context providers
│   ├── data                 # Static data files
│   ├── hooks                # Custom React hooks
│   ├── outlets              # Outlet components
│   ├── services             # Service functions and utilities
│   ├── types                # Additional TypeScript type definitions
│   ├── pages                # Page components
│   │   ├── [Page]           # Specific page components
│   │   │   ├── components   # Components specific to the page
│   │   │   ├── [Subpages]   # Subpages of the specific page
│   │   │   │   └── ...      # Additional subpage components
│   │   │   ├── Page.tsx     # Main page component
│   │   ...
```

### API Calls & Data Fetching

- All API endpoints are stored in the `api` folder.
- TanStack Query and Axios are used for API calls.
- Every endpoint should have its own file.
- Separation of mutations and queries:
  - **Mutations** are API calls that are actively triggered by the user's interaction (e.g., clicking a button).
  - **Queries** are API calls that are loaded automatically when rendering a component.

### State Management

#### Context-Provider Usage

The `ContextProvider` is used to provide information to all children components. 
It is responsible for storing or loading data. When the context changes, all children are re-rendered, so use changes of the context with consideration.
This ensures fresh data in the child components.

In some cases, the context is not used directly but rather through hooks. 
This approach provides additional functionality with the raw data, making it easier to use (e.g., `useProcess` or `useProject`).

##### Implementation Context-Provider

```text
<ContextProvider>
    {children}
</ContextProvider>
```

##### Example Context-Provider

```text

export interface ExampleContextProps {
  data: Data;
}

export const ExampleContext = createContext<ExampleContextProps>({
  data: {} as Data,
});

const ExampleContextProvider: React.FC = () => {
  const { data } = useData();

  return (
    <ExampleContext.Provider
      value={{
        data,
      }}
    >
      {children}
    </ExampleContext.Provider>
  );
};
```

##### Usage Context-Provider

```text
const { data } = useContext(ExampleContext);
```

#### Outlet Usage

Similar to the `ContextProvider`, but with the added functionality of rendering fallback content when data is not yet loaded. 
It uses a context provider inside.

In the `index.tsx`, most of the essentials are loaded, so the exception renders a loading screen.

In the app routing, the authentication exceptions trigger a rerouting to the index or showing an error page.

##### Implementation Outlet

```text
<Outlet>
    {children}
</Outlet>
```

##### Example Outlet

```text
export const OrganizationOutlet: React.FC<PropsWithChildren<Props>> = (
  props
) => {
  const { children } = props;
  const { user } = useUser();
  const organization = useGetOrganization(
    user.usertype === UserType.ORGANIZATION
  );

  if (user.usertype !== UserType.ORGANIZATION) return children;

  if (
    organization.isFetched &&
    organization.data !== undefined &&
    user.usertype === UserType.ORGANIZATION
  )
    return (
      <OrganizationContextProvider organization={organization.data}>
        {children}
      </OrganizationContextProvider>
    );
  else return <AppLoadingSuspense />;
};
```

### Running Tests

To run tests and check coverage, use the following command:

```bash
yarn test
```

The test results and coverage report can be viewed by opening the `index.html` file located in the `.coverage/lcov-report` directory.

## 💾 Deployment

### CI/CD with GitHub Actions

Upon a push to the staging or main branch, GitHub Actions triggers a webhook to the server. The server performs the following:

- Shuts down the current Docker container.
- Pulls the latest changes from the repository.
- Rebuilds and restarts the Docker container.

### Dockerized Servers

**Development**
Start the development container with HMR:

```bash
docker compose -f "docker-compose.dev.yml" up -d --build
```

Access at: [http://127.0.0.1:3000/](http://127.0.0.1:3000/)

**Production**
Start the production container without HMR:

```bash
docker compose -f "docker-compose.prod.yml" up -d --build
```

Access at: [http://127.0.0.1:3001/](http://127.0.0.1:3001/)

**Staging**
Start the staging container without HMR:

```bash
docker compose -f "docker-compose.staging.yml" up -d --build
```

Access at: [http://127.0.0.1:3000/](http://127.0.0.1:3000/)


## 🌟 Best Practices

### Clean Code

- Functional components with hooks over class components
- Keeping components small and reusable
- Using TypeScript/PropTypes for type safety
- Handling side effects properly (useEffect, useMemo, etc.)
  - Try avoiding useEffect directly or encapsulate it in custom hooks
- Avoiding unnecessary re-renders with memoization


### Naming

| Type                | Naming Convention | Example             |
|---------------------|-------------------|---------------------|
| Components          | PascalCase        | `MyComponent`       |
| Component folders   | PascalCase        | `MyComponentFolder` |
| Functions           | camelCase         | `myFunction`        |
| Variables           | camelCase         | `myVariable`        |
| Interfaces/Types    | PascalCase        | `MyInterface`       |
| Hooks               | use{PascalCase}   | `useMyHook`         |


### Styling Guidelines

- Always use Tailwind CSS, if applicable
- Preferable use the existing custom component library rather than creating new components from scratch


### Linting and Formatting

The linting and formatting happen on save of a file using the extension Prettier - Code formatter v10.1.0.


### VSCode Extensions

For an optimal development experience, install the following extensions:

#### WSL Extensions

- Tailwind CSS IntelliSense v0.10.5
- Prettier - Code formatter v10.1.0
- Jest v5.2.3
- Docker v1.28.0
- GitHub Copilot v1.156.0

#### Local Extensions

- Tailwind CSS IntelliSense v0.10.5
- WSL v0.81.9


## 📜 License

This project is licensed under the [Eclipse Public License 2.0 (EPL-2.0)](https://www.eclipse.org/legal/epl-2.0/).

You are free to use, modify, and distribute this software, provided that you comply with the terms of the license.

For more details, see the [LICENSE](./LICENSE) file in this repository.

