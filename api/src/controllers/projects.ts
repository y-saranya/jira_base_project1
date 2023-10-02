import { Project } from 'mongooseEntities';
import { BadUserInputError, EntityNotFoundError, catchErrors } from 'errors';

export const getProjectWithUsersAndIssues = catchErrors(async (_, res) => {
  const project = await Project.findOne()
    .populate('users')
    .populate('issues');

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
