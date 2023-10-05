import React from 'react';
import { Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';

import useApi from 'shared/hooks/api';
import { updateArrayItemById } from 'shared/utils/javascript';
import { createQueryParamModalHelpers } from 'shared/utils/queryParamModal';
import { PageLoader, PageError, Modal } from 'shared/components';
import { ActionButton } from 'Project/ProjectSettings/Styles';
import toast from 'shared/utils/toast';
import useCurrentUser from 'shared/hooks/currentUser';
import UserCreate from 'Project/UserCreate';
import Users from 'Project/Users';
import Pages from 'Project/Pages';

import NavbarLeft from './NavbarLeft';
import Sidebar from './Sidebar';
import Board from './Board';
import IssueSearch from './IssueSearch';
import IssueCreate from './IssueCreate';
import ProjectSettings from './ProjectSettings';
import { ProjectPage } from './Styles';


const Project = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const { currentUser } = useCurrentUser();

  const issueSearchModalHelpers = createQueryParamModalHelpers('issue-search');
  const issueCreateModalHelpers = createQueryParamModalHelpers('issue-create');
  const userCreateModalHelpers = createQueryParamModalHelpers('user-create');

  const [{ data, error, setLocalData }, fetchProject] = useApi.get('/project');
  const [_, createProject] = useApi.post('/project')

  if (!data) return <PageLoader />;
  if (error) return <PageError />;

  const { project } = data;

  const updateLocalProjectIssues = (issueId, updatedFields) => {
    console.log(updatedFields, 'updatedFields')
    setLocalData(currentData => ({
      project: {
        ...currentData.project,
        issues: updateArrayItemById(currentData.project.issues, issueId, updatedFields),
      },
    }));
  };

  const getProjectBoard = () => {
    return (
      <React.Fragment>
        <Sidebar project={project} />

        {issueSearchModalHelpers.isOpen() && (
          <Modal
            isOpen
            testid="modal:issue-search"
            variant="aside"
            width={600}
            onClose={issueSearchModalHelpers.close}
            renderContent={() => <IssueSearch project={project} />}
          />
        )}

        {issueCreateModalHelpers.isOpen() && (
          <Modal
            isOpen
            testid="modal:issue-create"
            width={800}
            withCloseIcon={false}
            onClose={issueCreateModalHelpers.close}
            renderContent={modal => (
              <IssueCreate
                project={project}
                fetchProject={fetchProject}
                onCreate={() => history.push(`${match.url}/board`)}
                modalClose={modal.close}
              />
            )}
          />
        )}

        <Route
          path={`${match.path}/board`}
          render={() => (
            <Board
              project={project}
              fetchProject={fetchProject}
              updateLocalProjectIssues={updateLocalProjectIssues}
            />
          )}
        />
        
        {currentUser && currentUser.isAdmin && (
          <Route
            path={`${match.path}/users`}
            render={() => (
              <Users fetchProject={fetchProject} />
            )}
          />
        )}

        <Route
          path={`${match.path}/pages`}
          render={() => <Pages />}
        />

        <Route
          path={`${match.path}/settings`}
          render={() => <ProjectSettings project={project} fetchProject={fetchProject} />}
        />
      </React.Fragment>
    )
  }

  return (
    <ProjectPage>
      <NavbarLeft
        project={project}
        issueSearchModalOpen={issueSearchModalHelpers.open}
        issueCreateModalOpen={issueCreateModalHelpers.open}
        userCreateModalOpen={userCreateModalHelpers.open}
      />

      {userCreateModalHelpers.isOpen() && (
          <Modal
            isOpen
            testid="modal:user-create"
            width={800}
            withCloseIcon={false}
            onClose={userCreateModalHelpers.close}
            renderContent={modal => (
              <UserCreate
                project={project}
                fetchProject={fetchProject}
                onCreate={() => history.push(`${match.url}/board`)}
                modalClose={modal.close}
              />
            )}
        />
      )}

      {!project ? (
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <p>no project created yet</p>
          <ActionButton onClick={async () => {
            try {
              await createProject();
              fetchProject();
            } catch (errorCatch) {
              toast.error(errorCatch.message);
            }
          }} variant="primary">Create Project</ActionButton>
        </div>
      ) : getProjectBoard()}

      {match.isExact && <Redirect to={`${match.url}/board`} />}
    </ProjectPage>
  );
};

export default Project;
