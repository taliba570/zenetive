Got it, thank you for pointing that out. Here’s the README content without using code blocks for formatting:

* * *

Zenetive Monorepo
=================

Welcome to the Zenetive Monorepo! This repository contains all components of Zenetive—a productivity and mental well-being tool designed to help users manage their time, build habits, and enhance focus through integrated time management, habit tracking, and meditation features.

* * *

Table of Contents
-----------------

1.  Overview
2.  Project Structure
3.  Getting Started
4.  Development
5.  Running Tests
6.  Code Quality and Linting
7.  Deployment
8.  Contributing
9.  License

* * *

Overview
--------

Zenetive aims to be a comprehensive tool for individuals and teams to improve productivity and mental well-being. This monorepo contains the following components:

*   **Frontend**: A ReactJS application with Tailwind CSS for styling, providing the user interface for Zenetive.
*   **Backend**: A NestJS application for managing API endpoints, business logic, and integrations.
*   **Shared**: Common code (e.g., utility functions, interfaces) shared between the frontend and backend to maintain consistency and reduce code duplication.

* * *

Project Structure
-----------------
```
zenetive/ 
├── frontend/ # ReactJS frontend application 
├── backend/ # NestJS backend application 
├── shared/ # Common utilities and interfaces 
├── package.json # Root-level package.json for shared dependencies and scripts 
├── turbo.json # Turborepo configuration file 
├── .gitignore # Git ignore file for the repository 
├── README.md # This README file 
└── other-config-files/ # Config files (e.g., ESLint, Prettier, etc.)
```
* * *

Getting Started
---------------

### Prerequisites

Ensure you have the following installed on your system:

*   Node.js (Recommended version: 16.x or later)
*   npm or Yarn
*   Git

### Installation

1.  Clone the repository:
    ```
    # git clone <repository-url>
    # cd zenetive
    ```
2.  Install dependencies at the root level:
    ```
      Using npm: `npm install`
      OR 
      using Yarn: `yarn install`
    ```

This will install dependencies for all projects in the monorepo.

* * *

Development
-----------

### Running the Frontend

Navigate to the `frontend/` directory and start the development server:
```
 cd frontend
 npm start
 OR
 yarn start
```
The frontend will typically be served at http://localhost:3000.

### Running the Backend

Navigate to the `backend/` directory and start the development server:
```
 cd backend
 npm run start
 OR
 yarn start
```

The backend will typically run on http://localhost:3001.

### Running Both Projects with Turborepo

To run the frontend and backend concurrently from the root directory using Turborepo:
```
 npm run dev
 OR
 yarn dev
```

Running Tests
-------------

### Frontend Tests

To run tests for the frontend application:
```
 cd frontend
 npm test
 OR
 yarn test
```

### Backend Tests

To run tests for the backend using Jest:
```
 cd backend
 npm test
 OR
 yarn test
```

Code Quality and Linting
------------------------

### Linting

We use ESLint to enforce code quality standards. To run linting across all projects:
```
 npm run lint
 OR
 yarn lint
```

### Formatting

To format code using Prettier:
```
 npm run format
 OR
 yarn format
```

Husky is used to enforce pre-commit hooks for linting and testing.

* * *

Deployment
----------

### Frontend Deployment

The frontend is deployed using AWS Amplify. Pushing changes to the main branch triggers a deployment.

### Backend Deployment

The backend is deployed on an AWS EC2 instance. Pull changes from the main branch and restart the server as needed.

Semantic Commits
----------------

This project follows a **semantic commit message** convention to keep a clean and meaningful Git history. Semantic commits make it easier to understand the purpose of each change and generate automated release notes. Here is the format for semantic commits:

### Commit Message Structure
```
<type>(<scope>): <description>
```
### Common Types

*   **feat**: A new feature.
*   **fix**: A bug fix.
*   **docs**: Documentation changes only.
*   **style**: Code style changes (formatting, whitespace, etc.) that do not affect code functionality.
*   **refactor**: Code changes that neither fix a bug nor add a feature.
*   **test**: Adding or updating tests.
*   **chore**: Changes to the build process or auxiliary tools and libraries.

### Examples

*   `feat(frontend): add user profile page`
*   `fix(backend): resolve issue with JWT token validation`
*   `docs: update contributing guidelines`
*   `style(shared): fix indentation issues`

### Scopes

*   **frontend**: Refers to changes in the ReactJS application.
*   **backend**: Refers to changes in the NestJS application.
*   **shared**: Refers to changes in shared utilities or code.

By following this convention, we maintain a clear and consistent commit history.

Contributing
------------

We welcome contributions! Please follow the steps below:

1.  Fork the repository.
2.  Create a new branch for your feature or bugfix: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -m 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Open a pull request.

For detailed guidelines, please refer to the CONTRIBUTING.md file.

* * *

License
-------

This project is licensed under the MIT License. Thank you for using and contributing to Zenetive!