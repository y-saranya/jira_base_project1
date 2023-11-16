/* eslint-disable no-underscore-dangle */
import { Issue, Project } from 'mongooseEntities';
import { BadUserInputError, EntityNotFoundError, catchErrors } from 'errors';

export const create = catchErrors(async (req, res) => {
  const { body } = req;
  const project = new Project({
    ...body,
    users: [req.currentUser._id],
  });
  await project.save();
  res.respond({ project });
});

export const getProjectWithUsersAndIssues = catchErrors(async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    throw new BadUserInputError({ projectId });
  }
  const project = await Project.findById(projectId).populate('users');
  if (project) {
    project.issues = await Issue.find({ project: project._id });
  }
  res.respond({
    project,
  });
});

export const getAllProjects = catchErrors(async (_, res) => {
  const projects = await Project.find().populate('users');
  res.respond({
    projects,
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
