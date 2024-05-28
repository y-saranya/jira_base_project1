# Requirement Document for Jira Clone Project

## Project Overview:

This project involves developing a task management tool similar to Jira using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The aim is to create a robust application that facilitates task tracking, project management, and team collaboration.

## Detailed Requirements:

<b>User Avatar Tooltip</b>

Objective: Enhance user interface by displaying tooltips when hovering over user avatar icons.
Details: Tooltips should display user's name.
User Impact: Improves user recognition and communication efficiency.
Testing Considerations: Ensure tooltips are correctly displayed on all pages where user avatars are present.

<b>Side Bar</b>

Objective: Implement a collapsible side bar for better screen space management.
Details: The side bar should have a button to toggle between collapse and expand states, preserving user preference across sessions.
User Impact: Allows users to manage screen space according to preference.
Testing Considerations: Verify state persistence and functionality on different screen sizes.

<b>Reporter Edit</b>

Objective: Restrict reporter modification rights to admin users after a task has been created.
Details: Only admin can change the reporter of a task through the task edit panel.
User Impact: Ensures accountability and control over task management.
Testing Considerations: Test role-based access control and ensure non-admins cannot modify the reporter.

<b>Single Assignee</b>

Objective: Modify the task assignment feature to allow only one assignee per task.
Details: Change the UI and backend to restrict task assignment to a single user.
User Impact: Streamlines task responsibility.
Testing Considerations: Validate that only one assignee can be selected and stored per task.

<b>Multiple Projects</b>

Objective: Enable the creation and management of multiple projects within the platform.
Details: Users should be able to create, view, and manage projects based on their roles.
User Impact: Facilitates department-specific Task management.
Testing Considerations: Test project creation, role-based visibility, and management features.

<b>Multi-Project Select for Users</b>

Objective: Allow users to select and manage multiple projects simultaneously.
Details: Implement a user interface for selecting multiple projects and a dashboard to view combined information.
User Impact: Enhances user productivity and project oversight.
Testing Considerations: Ensure accurate aggregation of data from multiple projects and user-friendly navigation.

<b>Edit User</b>

Objective: Provide functionality for editing user details including project assignments and roles.
Details: Add an 'Edit User' option in the user profile or admin panel with fields for role and project assignments.
User Impact: Ensures flexibility in managing user responsibilities and affiliations.
Testing Considerations: Test for correct updating of user details in the database and proper reflections in the UI.

<b>User Mention</b>

Objective: Implement a user mention feature to enhance communication within tasks and comments.
Details: Users should be able to mention other users using '@' followed by the username, which should hyperlink to the mentioned user's profile.
User Impact: Streamlines communication within the platform.
Testing Considerations: Ensure that mentions generate notifications and are correctly linked to user profiles.

<b>Mailer Features</b>

Objective: Enhance communication and notification capabilities through integrated mail features.
Details: Implement mail notifications for task assignments, due date reminders, and project updates.
User Impact: Keeps users informed and engaged with ongoing project activities.
Testing Considerations: Verify reliability and timeliness of mail delivery, and ensure customization options for mail notifications.
