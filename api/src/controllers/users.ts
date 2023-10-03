/* eslint-disable no-underscore-dangle */
import { BadUserInputError, catchErrors } from 'errors';
import { Project, User } from 'mongooseEntities';
import { signToken } from 'utils/authToken';

export const create = catchErrors(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadUserInputError({ email: 'Email not provided' });
  }
  const user = new User(req.body);
  await user.save();
  const project = await Project.findOne();
  if (project) {
    project.users.push(user._id);
    await project.save();
  }
  res.respond({ user });
});

export const login = catchErrors(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadUserInputError({ email: 'Email not provided' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadUserInputError({ email: 'email not found' });
  }
  res.respond({ authToken: signToken({ sub: user._id }) });
});

export const getCurrentUser = catchErrors((req, res) => {
  res.respond({ currentUser: req.currentUser });
});
