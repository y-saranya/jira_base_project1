/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';
import Select from 'react-select';

import { ProjectCategoryCopy } from 'shared/constants/projects';
import { Icon, ProjectAvatar } from 'shared/components';
import useCurrentUser from 'shared/hooks/currentUser';

import {
  Sidebar,
  ProjectInfo,
  ProjectTexts,
  ProjectName,
  ProjectCategory,
  Divider,
  MyButton,
  LinkItem,
  LinkText,
  NotImplemented,
} from './Styles';

const propTypes = {
  currentProject: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  setCurrentProject: PropTypes.func.isRequired,
};

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

const ProjectOption = ({ data, innerRef, innerProps }) => {
  return (
    <ProjectInfo key={data._id} ref={innerRef} {...innerProps}>
      <ProjectAvatar />
      <ProjectTexts>
        <ProjectName>{data.name}</ProjectName>
        <ProjectCategory>{ProjectCategoryCopy[data.category]} project</ProjectCategory>
      </ProjectTexts>
    </ProjectInfo>
  );
};

const ProjectSidebar = ({ projects, setCurrentProject, currentProject }) => {
  const match = useRouteMatch();
  const { currentUser } = useCurrentUser();
  const [selectedProject, setSelectedProject] = useState(currentProject);

  useEffect(() => {
    if (currentProject) {
      setSelectedProject(currentProject);
    }
  }, [currentProject]);

  const onChange = data => {
    setCurrentProject(data);
    setSelectedProject(data);
  };

  function onClick() {
    const side = document.getElementById('sidebar');
    const mybutton = document.getElementById('button');
    const myboard = document.getElementById('board');

    if (mybutton.innerHTML === '&lt;&lt;') {
      side.style.transform = 'translate(-220px)';
      mybutton.innerHTML = '&gt;&gt;';
      myboard.style.paddingLeft = '130px';
    } else {
      side.style.transform = 'translate(0px)';
      mybutton.innerHTML = '&lt;&lt;';
      myboard.style.paddingLeft = '334px';
    }
  }

  return (
    <Sidebar id="sidebar">
      <div style={{ width: 190 }}>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          {selectedProject && projects && projects.length > 0 && (
            <Select
              value={selectedProject}
              onChange={onChange}
              isSearchable={false}
              formatOptionLabel={data => (
                <ProjectInfo key={data._id}>
                  <ProjectTexts>
                    <ProjectName>{data.name}</ProjectName>
                    <ProjectCategory>{ProjectCategoryCopy[data.category]} project</ProjectCategory>
                  </ProjectTexts>
                </ProjectInfo>
              )}
              components={{
                Option: ProjectOption,
              }}
              options={projects}
            />
          )}
        </div>

        {renderLinkItem(match, 'Kanban Board', 'board', '/board')}
        {currentUser && currentUser.isAdmin && renderLinkItem(match, 'Users', 'user', '/users')}
        {currentUser &&
          currentUser.isAdmin &&
          renderLinkItem(match, 'Project settings', 'settings', '/settings')}
        {currentUser &&
          currentUser.isAdmin &&
          renderLinkItem(match, 'My Report', 'myreport', '/Report')}
        <Divider />
        {renderLinkItem(match, 'Releases', 'shipping')}
        {renderLinkItem(match, 'Issues and filters', 'issues')}
        {renderLinkItem(match, 'Pages', 'page', '/pages')}
        {renderLinkItem(match, 'Reports', 'reports')}
        {renderLinkItem(match, 'Components', 'component')}
      </div>
      <MyButton onClick={onClick} id="button">
        &lt;&lt;
      </MyButton>
    </Sidebar>
  );
};

const renderLinkItem = (match, text, iconType, path) => {
  const isImplemented = !!path;

  const linkItemProps = isImplemented
    ? { as: NavLink, exact: true, to: `${match.path}${path}` }
    : { as: 'div' };

  return (
    <LinkItem {...linkItemProps}>
      <Icon type={iconType} />
      <LinkText>{text}</LinkText>
      {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
    </LinkItem>
  );
};

ProjectSidebar.propTypes = propTypes;

export default ProjectSidebar;
