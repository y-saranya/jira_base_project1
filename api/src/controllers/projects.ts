import { Project as EnProject } from 'entities';
import { Project } from 'mongooseEntities';
import { catchErrors } from 'errors';
import { updateEntity } from 'utils/typeorm';

export const getProjectWithUsersAndIssues = catchErrors(async (_, res) => {
  const project = await Project.find()
    .populate('users')
    .populate('issues');
  console.log(project, 'project');
  res.respond({
    project: project[0],
  });
});

export const update = catchErrors(async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const project = await updateEntity(EnProject, req.currentUser._id, req.body);
  res.respond({ project });
});
