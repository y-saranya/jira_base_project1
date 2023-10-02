import { BadUserInputError, EntityNotFoundError, catchErrors } from 'errors';
import { Comment } from 'mongooseEntities';

export const create = catchErrors(async (req, res) => {
  const comment = new Comment({ ...req.body });
  await comment.save();
  res.respond({ comment });
});

export const update = catchErrors(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    throw new BadUserInputError({ commentId });
  }
  const comment = await Comment.updateOne({ _id: commentId }, req.body);
  if (!comment) {
    throw new EntityNotFoundError(Comment.name);
  }
  res.respond({ comment });
});

export const remove = catchErrors(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    throw new BadUserInputError({ commentId });
  }
  const comment = await Comment.deleteOne({ _id: commentId });
  res.respond({ comment });
});
