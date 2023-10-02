import { IIssue, Issue } from 'mongooseEntities';
import { Issue as EnIssue } from 'entities';
import { catchErrors } from 'errors';
import { updateEntity, deleteEntity, findEntityOrThrow } from 'utils/typeorm';

export const getProjectIssues = catchErrors(async (req, res) => {
  const { _id } = req.currentUser;
  // const { searchTerm } = req.query;

  // let whereSQL = 'issue._id = :_id';

  // if (searchTerm) {
  //   whereSQL += ' AND (issue.title ILIKE :searchTerm OR issue.descriptionText ILIKE :searchTerm)';
  // }

  // const issues = await Issue.createQueryBuilder('issue')
  //   .select()
  //   .where(whereSQL, { _id, searchTerm: `%${searchTerm}%` })
  //   .getMany();

  const issues = await Issue.find({ users: _id });

  res.respond({ issues });
});

export const getIssueWithUsersAndComments = catchErrors(async (req, res) => {
  const issue = await findEntityOrThrow(EnIssue, req.params.issueId, {
    relations: ['users', 'comments', 'comments.user'],
  });
  res.respond({ issue });
});

export const create = catchErrors(async (req, res) => {
  const listPosition = await calculateListPosition(req.body);
  console.log(listPosition, 'listPositions');
  // const issue = await createEntity(EnIssue, { ...req.body, listPosition });
  console.log(req.currentUser, 'projectId');
  const issue = new Issue({ ...req.body, listPosition });
  await issue.save();
  console.log(issue, 'issue');
  res.respond({ issue });
});

export const update = catchErrors(async (req, res) => {
  const issue = await updateEntity(EnIssue, req.params.issueId, req.body);
  res.respond({ issue });
});

export const remove = catchErrors(async (req, res) => {
  const issue = await deleteEntity(EnIssue, req.params.issueId);
  res.respond({ issue });
});

const calculateListPosition = async ({ _id, status }: IIssue): Promise<number> => {
  const issues = await Issue.find({ _id, status });

  const listPositions = issues.map(({ listPosition }) => listPosition);

  if (listPositions.length > 0) {
    return Math.min(...listPositions) - 1;
  }
  return 1;
};
