import { Comment, IIssue, Issue } from 'mongooseEntities';
import { BadUserInputError, EntityNotFoundError, catchErrors } from 'errors';

export const getProjectIssues = catchErrors(async (req, res) => {
  const { _id } = req.currentUser;
  const issues = await Issue.find({ users: _id });
  res.respond({ issues });
});

export const getIssueWithUsersAndComments = catchErrors(async (req, res) => {
  const { issueId } = req.params;
  if (!issueId) {
    throw new BadUserInputError({ issueId });
  }
  const issue = await Issue.findOne({ _id: issueId }).populate('users');

  if (issue) {
    issue.comments = await Comment.find({ issue: issueId });
  }
  res.respond({ issue });
});

export const create = catchErrors(async (req, res) => {
  const listPosition = await calculateListPosition(req.body);
  const issue = new Issue({ ...req.body, listPosition });
  await issue.save();
  res.respond({ issue });
});

export const update = catchErrors(async (req, res) => {
  const { issueId } = req.params;
  if (!issueId) {
    throw new BadUserInputError({ issueId });
  }
  const issue = await Issue.updateOne({ _id: issueId }, req.body);
  if (!issue) {
    throw new EntityNotFoundError(Issue.name);
  }
  res.respond({ issue });
});

export const remove = catchErrors(async (req, res) => {
  const { issueId } = req.params;
  if (!issueId) {
    throw new BadUserInputError({ issueId });
  }
  const issue = await Issue.deleteOne({ _id: issueId });
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
