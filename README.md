# 🚀 Semper-KI Frontend

## 🔍 Project Overview

### Short Description

The Semper-KI Frontend acts as a platform where users can submit their 3D printing requirements and find suitable service providers. It leverages artificial intelligence to optimize the matching process, considering factors such as material properties, printing technology, pricing, and delivery options. The user-friendly interface allows users to easily navigate, submit their requirements, and track order progress, streamlining the process of connecting supply and demand in the 3D printing industry.

### Live Demo/Preview

[Semper-KI Live Demo](https://semper-ki.org/)

(Note: This is a science project, and the demo may not be available later on.)

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: v18.12.0
- **Yarn**: v1.22.19
- **npm**: v8.19.2
- **Docker**: Latest version

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

## 🛠️ Development

### Scripts

The following scripts can be run using `yarn <scriptname>`. For example, to start the development server, use `yarn start`.

- **start**: Starts the development server using Vite.
  
  ```json
  "start": "vite"
  ```

- **build**: Compiles TypeScript and builds the project using Vite.
  
  ```json
  "build": "tsc && vite build"
  ```

- **serve**: Serves the built project using Vite on port 3000.
  
  ```json
  "serve": "vite preview --port 3000"
  ```

- **test**: Runs tests with Jest, including coverage and CI reporting.
  
  ```json
  "test": "jest --coverage --ci --reporters=default --reporters=jest-junit"
  ```

- **test:ci**: Runs tests with Jest in CI mode, compiles TypeScript, and builds the project. (used in Github Action)
  
  ```json
  "test:ci": "jest --ci --reporters=default && tsc && vite build"
  ```

- **doc**: Generates documentation using TypeDoc.
  
  ```json
  "doc": "typedoc --options typedoc.json"
  ```

### Running the Development Server

To start the development server, run:

```bash
yarn start
```

The server will be running at: [http://127.0.0.1:3000/](http://127.0.0.1:3000/)

### TypeDoc

You can generate documentation using TypeDoc with the following command:

```bash
yarn doc
```

This command generates a documentation overview in the `.doc` folder. You can view the documentation by opening the `index.html` file in a web browser.

### Naming

| Type                | Naming Convention | Example             |
|---------------------|-------------------|---------------------|
| Components          | PascalCase        | `MyComponent`       |
| Component folders   | PascalCase        | `MyComponentFolder` |
| Functions           | camelCase         | `myFunction`        |
| Variables           | camelCase         | `myVariable`        |
| Interfaces/Types    | PascalCase        | `MyInterface`       |
| Hooks               | use{PascalCase}   | `useMyHook`         |

### Best Practices

- Functional components with hooks over class components
- Keeping components small and reusable
- Using TypeScript/PropTypes for type safety
- Handling side effects properly (useEffect, useMemo, etc.)
  - try avoiding useEffect or put it in Hooks
- Avoiding unnecessary re-renders with memoization

#### Context-Provider Usage

The `ContextProvider` is used to provide information to all children components. It is responsible for storing or loading data. When the context changes, all children are re-rendered, so use changes of the context with consideration. This ensures fresh Data in the children.

In some cases, the context is not used directly but rather through hooks. This approach provides additional functionality with the raw data, making it easier to use (e.g., `useProcess` or `useProject`).

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
...
const { data } = useContext(ExampleContext);
...
```

#### Outlet Usage

Similar to the `ContextProvider`, but with the difference that when the data is not loaded, it renders something else. It uses a context provider inside.

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

### Styling Guidelines

- Use of Tailwind, if applicable

### API Calls & Data Fetching

- All API endpoints are stored in the `api` folder.
- TanStack Query and Axios are used for API calls.
- Every endpoint should have its own file.
- Separation of mutations and queries:
  - **Mutations** are API calls that are actively triggered by the user's interaction (e.g., clicking a button).
  - **Queries** are API calls that are loaded automatically when rendering a component.

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

### Running Tests

To run tests and check coverage, use the following command:

```bash
yarn test
```

The test results and coverage report can be viewed by opening the `index.html` file located in the `.coverage/lcov-report` directory.

### Linting and Formatting

The linting and formatting happen on save of a file using the extension Prettier - Code formatter v10.1.0.

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

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, MUI, Three.js
- **State Management**: Zustand, React Query
- **Forms**: Formik, React Hook Form
- **3D & Visualization**: Three.js, D3
- **Internationalization**: i18next
- **Testing**: Jest, Testing Library
- **Code Quality**: ESLint, Prettier
- **Bundler**: Vite
- **Containerization**: Docker

## Connection to Backend

The Semper-KI Frontend is designed to connect to the Semper-KI Backend. Please refer to the documentation of the Semper-KI Backend for instructions on how to set up and configure the backend.
