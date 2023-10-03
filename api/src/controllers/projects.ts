/* eslint-disable no-underscore-dangle */
import { Issue, Project } from 'mongooseEntities';
import { BadUserInputError, EntityNotFoundError, catchErrors } from 'errors';
import { ProjectCategory } from 'constants/projects';

export const create = catchErrors(async (req, res) => {
  if (await Project.findOne()) {
    throw new BadUserInputError({ project: 'Only One Project is allowed' });
  }
  const project = new Project({
    name: 'SkillBridge',
    url: 'https://www.atlassian.com/software/jira',
    description:
      'Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.',
    category: ProjectCategory.SOFTWARE,
    users: [req.currentUser._id],
  });
  await project.save();
  res.respond({ project });
});

export const getProjectWithUsersAndIssues = catchErrors(async (_, res) => {
  const project = await Project.findOne().populate('users');
  if (project) {
    project.issues = await Issue.find({ project: project._id });
  }
  res.respond({
    project,
  });
});

export const update = catchErrors(async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    throw new BadUserInputError({ projectId });
  }
  const project = await Project.updateOne({ _id: projectId }, req.body);
  if (!project) {
    throw new EntityNotFoundError(Project.name);
  }
  res.respond({ project });
});
