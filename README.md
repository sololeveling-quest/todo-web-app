# v0.dev Instructions

**You are a seasoned full-stack developer tasked with building a web application named Todo Web App. Your focus should be on writing robust, reliable, reusable, easy to maintain, readable, and testable code.**

You need to strictly implement only the functional requirements listed. Do not add any additional features, functionality, or code beyond what has been specified.

You must consider all of the following sections comprehensively in your response to ensure a well-rounded development plan:
## Technologies to Use:
- **Web Framework**: Next.js version 15.1.4
- **UI Library**: Shadcn/UI version 0.4.0 and TailwindCSS 3.4.17
- **CMS/Backend**: PayloadCMS version 3.17.1
## Development Steps:
1. **Frontend Development** :
    - Prioritize building the frontend first, ensuring that all user stories and acceptance criteria are fully addressed.
    - Align the implementation with the provided technical notes for frontend development.
    - Validate the functionality and UI/UX against the defined requirements before proceeding to the backend stage.
2. **Backend Development** :
    - After completing the frontend, transition to backend development.
    - Ensure the backend is built in accordance with the technical notes and integrates seamlessly with the frontend.
    - Perform necessary tests to verify that backend functionality meets the acceptance criteria and aligns with overall project objectives.
## User Stories & Acceptance Criteria
### User Authentication

#### User Story 1: Account Creation

**As a** new user, **I want** to create an account **so that** I can access the application and manage my tasks.

**Acceptance Criteria** :

- The user must provide their name, email, password, and password confirmation.
- The system must validate that the password and confirmation match.
- The user's email must be in a valid format.
- Upon successful registration, the user should receive a confirmation message.
- The user should be redirected to the login page after account creation.

---
#### User Story 2: User Login

**As a** registered user, **I want** to log in to my account **so that** I can access my tasks.

**Acceptance Criteria** :

- The user must input their registered email and password on the login page.
- The system must validate the credentials and allow the user to log in if they are correct.
- Upon successful login, the user should be redirected to their dashboard.
- If the credentials are incorrect, the user must receive an error message.

**Dependencies** : The user must have created an account (see User Story 1).

---
#### User Story 3: Password Reset

**As a** user who has forgotten their password, **I want** to reset my password using my email address **so that** I can regain access to my account.

**Acceptance Criteria** :

- The user should be able to navigate to the "Forgot Password" page from the login page.
- The user must input their registered email to receive a password reset link.
- The system must send a reset link to the registered email address.
- The user should be able to set a new password using the reset link.
- Upon successfully resetting the password, the user must be able to log in with the new password.

**Dependencies** : The user must have created an account (see User Story 1).

---
#### User Story 4: Navigation Between Authentication Pages

**As a** user, **I want** to easily navigate between the login, registration, and password reset pages **so that** I can manage my account without confusion.

**Acceptance Criteria** :

- The registration page must have links to the login and forgot password pages.
- The login page must have links to the registration and forgot password pages.
- The forgot password page must have links to the login and registration pages.
- All links must function correctly and provide the appropriate navigation.

---
### Category Management

#### User Story 5: Creating and Managing Task Categories

**As a** user, **I want** to create and manage task categories **so that** I can organize my tasks effectively.

**Acceptance Criteria** :

- There must be an option to create new categories from the sidebar.
- Users should be able to name their categories and save them.
- Users must be able to rename existing categories.
- Users must be able to delete user-defined categories.
- Predefined categories (Important, Planned, All Tasks) must be displayed but not editable or deletable.

---
#### User Story 6: Viewing Tasks by Category

**As a** user, **I want** to view my tasks in different categories **so that** I can focus on specific types of tasks.

**Acceptance Criteria** :

- Each category must be listed in the sidebar.
- Clicking on a category should filter the main task list to show only tasks in that category.
- The system should display the number of tasks in each category.

---
#### User Story 7: Filtering and Searching Tasks

**As a** user, **I want** to filter and search for tasks by title or hashtags **so that** I can quickly find the tasks I need.

**Acceptance Criteria** :

- There must be a search bar at the top of the task list.
- Users should be able to enter keywords to filter tasks.
- The system must return results based on the task title and hashtags.
- Users should see an updated list of tasks as they type in the search bar.

---
### Task Management

#### User Story 8: Adding a New Task

**As a** user, **I want** to add a new task by clicking an "Add a task" button **so that** I can manage my to-do list.

**Acceptance Criteria** :

- The "Add a task" button should be clearly visible on the dashboard.
- Clicking the button should open a form to enter task details (title, description, category).
- The task should be added to the list after clicking "Submit."
- The new task should appear immediately in the task list.

**Dependencies** : Users must have categories set up to assign tasks to categories (see User Story 5).

---
#### User Story 9: Editing Existing Tasks

**As a** user, **I want** to edit my existing tasks **so that** I can update them as needed.

**Acceptance Criteria** :

- Each task must have an "Edit" option (e.g., a pencil icon) next to it in the task list.
- Clicking the icon should bring up the task details for editing.
- The user should be able to modify the task title, description, and category.
- Changes should be saved and reflected in the task list after clicking "Save."

**Dependencies** : Users must have categories set up to assign tasks to categories (see User Story 5).

---
#### User Story 10: Deleting Tasks

**As a** user, **I want** to delete tasks **so that** I can remove items that are no longer relevant.

**Acceptance Criteria** :

- Each task must include a "Delete" button (e.g., trash can icon).
- Clicking the "Delete" button should prompt the user to confirm the deletion.
- Upon confirmation, the task should be removed from the list.
- The user should receive a visual confirmation that the task was deleted.

---
#### User Story 11: Completing Tasks

**As a** user, **I want** to mark tasks as complete or incomplete **so that** I can track my progress.

**Acceptance Criteria** :

- Each task must have a checkbox or toggle to mark it as complete.
- When the checkbox is checked, the task should visually indicate completion (e.g., strikethrough).
- Users should have the option to uncheck the box to mark the task as incomplete.
- The changes should be saved automatically.

---
### Task Details

#### User Story 12: Adding Reminders and Due Dates

**As a** user, **I want** to add reminders and due dates to my tasks **so that** I can be alerted about important deadlines.

**Acceptance Criteria** :

- The task creation and editing forms must include fields for reminders and due dates.
- Users should be able to select a date from a date picker for the due date.
- Users should be able to set reminders for specific times.
- The system must send notifications to users when reminders are due.

---
#### User Story 13: Breaking Tasks into Steps

**As a** user, **I want** to break tasks into smaller steps **so that** I can track my progress more effectively.

**Acceptance Criteria** :

- Open a task should include an option to add sub-steps or subtasks.
- Users should be able to enter multiple steps and save them with the main task.
- The number of completed and remaining steps should be displayed next to the task.
- Users should be able to mark individual steps as complete.

---
#### User Story 14: Adding Notes or Comments to Tasks

**As a** user, **I want** to add notes or comments to my tasks **so that** I can capture additional information relevant to the task.

**Acceptance Criteria** :

- Open the specific task should show a section for notes or comments.
- Users should be able to add, edit, and delete notes.
- Notes should be saved and displayed when the task is viewed.
- There should be a character limit if applicable.

---
#### User Story 15: Grouping Tasks with Hashtags

**As a** user, **I want** to group my tasks using multiple hashtags **so that** I can categorize them effectively.

**Acceptance Criteria** :

- Users should be able to add hashtags in the task title or description.
- Hashtags should be displayed prominently in the task list.
- The system should allow the filtering of tasks by hashtags.
- Users should be able to click on a hashtag to view all related tasks.

---
### User Interface

#### User Story 16: Navigating Through Task Categories

**As a** user, **I want** to navigate through different categories of tasks **so that** I can manage my tasks efficiently.

**Acceptance Criteria** :

- Users must be able to access categories from the sidebar navigation.
- Selecting a category should change the displayed tasks without reloading the page.
- Users should receive visual indications of the currently active category.

---
#### User Story 17: Customizing Categories

**As a** user, **I want** to customize my task categories (e.g., rename, reorder) **so that** I can organize them to fit my needs.

**Acceptance Criteria** :

- Users must be able to click and drag categories to reorder them.
- Users should have an option to rename custom categories.
- Changes to category names must be saved and reflected immediately.

---
#### User Story 18: Visual Confirmation of Completed Tasks

**As a** user, **I want** to receive visual confirmation (e.g., checkmarks) when tasks are completed **so that** I can easily track my progress.

**Acceptance Criteria** :

- Completed tasks must display a checkmark or strikethrough.
- The visual indicators must be clearly visible in the task list.

---
### Help/Onboarding

#### User Story 19: Onboarding Tips for New Users

**As a** new user, **I want** onboarding tips or tutorials **so that** I can quickly learn how to use the application.

**Acceptance Criteria** :

- Upon first login, the user must see a series of onboarding messages or tooltips guiding them through key features.
- Users should have the option to dismiss the onboarding tips.
- The onboarding tips must include instructions for adding a task and navigating the app.

## Technical Notes for Frontend Development:
- Use App Router instead of Pages Router in Next.js.
- Mock all API request but provide a placeholder for future backend integration
- Avoid server actions in Next.js.
- Centralize API requests from client to server in `/lib/client/api.ts`.
- Centralize dummy data in `/lib/client/dummy.ts`.
- Centralize interface/types in `/lib/types.ts`.
- Use the `zod` library for input validation throughout the application. Ensure that all input data, such as forms and API requests, are validated using `zod` schemas to enforce type safety and improve error handling.
- Centralize `zod` validation schema in `/lib/validation.ts`.
- During frontend development, mock all backend-related functionality. This includes simulating API responses, authentication flows, and any data interactions to facilitate development without relying on the actual backend.
- Create `/context/AppContext.ts` to manage data accessibility across the application. This context should include:
	- **User Session Management** : Store and manage user session data, including authentication state, user information, and any relevant session tokens.
	- **Global State Management** : Provide methods for updating and accessing global states, such as user preferences or application-wide settings.
- Prefer Next.js built-in functions over third-party libraries whenever possible, using third-party libraries only when necessary. 
- Prefer to use functional components instead of class-based components throughout the application. Functional components should utilize React hooks for state management and lifecycle methods.
- Do not generate file `next.config.js` .
- Do not use React.js reducer.
- For login endpoint `/api/users/login` with method POST
- For logout endpoint `/api/users/logout` with method POST
- For get current auth endpoint `/api/users/me` with method GET
- For forgot password endpoint `/api/users/forgot-password` with method POST
- For registration endpoint `/api/users` with method POST
## Technical Notes for Backend Development:
- Only create collections in PayloadCMS. No additional files or components are needed at this time. Ensure each collection is accurately defined to meet the functional requirements and aligns with the frontend data structure.
- Create a middleware file in `middleware.ts`. In this middleware, check for the presence of a cookie with the key `payload-token`.
- No need to use any authentication logic, because it is already covered by PayloadCMS built-in features.
- Do not generate file `payload.config.ts`.

