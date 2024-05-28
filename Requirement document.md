# Requirement Document for Jira Clone Project

## Project Overview:

This project involves developing a task management tool similar to Jira using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The aim is to create a robust application that facilitates task tracking, project management, and team collaboration.

## Detailed Requirements:

<b>User Avatar Tooltip</b>

<b>Objective</b>: Enhance user interface by displaying tooltips when hovering over user avatar icons.\
<b>Details</b>: Tooltips should display user's name.\
<b>User Impact</b>: Improves user recognition and communication efficiency.\
<b>Testing Considerations</b>: Ensure tooltips are correctly displayed on all pages where user avatars are present.

<b>Side Bar</b>

<b>Objective</b>: Implement a collapsible side bar for better screen space management.\
<b>Details</b>: The side bar should have a button to toggle between collapse and expand states, preserving user preference across sessions.\
<b>User Impact</b>: Allows users to manage screen space according to preference.\
<b>Testing Considerations</b>: Verify state persistence and functionality on different screen sizes.

<b>Reporter Edit</b>

<b>Objective</b>: Restrict reporter modification rights to admin users after a task has been created.\
<b>Details</b>: Only admin can change the reporter of a task through the task edit panel.\
<b>User Impact</b>: Ensures accountability and control over task management.\
<b>Testing Considerations</b>: Test role-based access control and ensure non-admins cannot modify the reporter.

<b>Single Assignee</b>

<b>Objective</b>: Modify the task assignment feature to allow only one assignee per task.\
<b>Details</b>: Change the UI and backend to restrict task assignment to a single user.\
<b>User Impact</b>: Streamlines task responsibility.\
<b>Testing Considerations</b>: Validate that only one assignee can be selected and stored per task.

<b>Multiple Projects</b>

<b>Objective</b>: Enable the creation and management of multiple projects within the platform.\
<b>Details</b>: Users should be able to create, view, and manage projects based on their roles.\
<b>User Impact</b>: Facilitates department-specific Task management.\
<b>Testing Considerations</b>: Test project creation, role-based visibility, and management features.

<b>Multi-Project Select for Users</b>

<b>Objective</b>: Allow users to select and manage multiple projects simultaneously.\
<b>Details</b>: Implement a user interface for selecting multiple projects and a dashboard to view combined information.\
<b>User Impact</b>: Enhances user productivity and project oversight.\
<b>Testing Considerations</b>: Ensure accurate aggregation of data from multiple projects and user-friendly navigation.

<b>Edit User</b>

<b>Objective</b>: Provide functionality for editing user details including project assignments and roles.\
<b>Details</b>: Add an 'Edit User' option in the user profile or admin panel with fields for role and project assignments.\
<b>User Impact</b>: Ensures flexibility in managing user responsibilities and affiliations.\
<b>Testing Considerations</b>: Test for correct updating of user details in the database and proper reflections in the UI.

<b>User Mention</b>

<b>Objective</b>: Implement a user mention feature to enhance communication within tasks and comments.\
<b>Details</b>: Users should be able to mention other users using '@' followed by the username, which should hyperlink to the mentioned user's profile.\
<b>User Impact</b>: Streamlines communication within the platform.\
<b>Testing Considerations</b>: Ensure that mentions generate notifications and are correctly linked to user profiles.

<b>Mailer Features</b>

<b>Objective</b>: Enhance communication and notification capabilities through integrated mail features.\
<b>Details</b>: Implement mail notifications for task assignments, due date reminders, and project updates.\
<b>User Impact</b>: Keeps users informed and engaged with ongoing project activities.\
<b>Testing Considerations</b>: Verify reliability and timeliness of mail delivery, and ensure customization options for mail notifications.
