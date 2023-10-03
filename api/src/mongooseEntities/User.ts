import mongoose, { Document, Schema } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IUser extends Document {
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  comments: mongoose.Types.ObjectId[];
  issues: mongoose.Types.ObjectId[];
  project: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    maxlength: 200,
    unique: true,
    // You can add custom validation for email if needed
  },
  avatarUrl: {
    type: String,
    maxlength: 2000,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  issues: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Issue',
    },
  ],
  project: {
    type: mongoose.Types.ObjectId,
    ref: 'Project',
  },
});

// Automatically update the `updatedAt` field on save
// eslint-disable-next-line func-names
UserSchema.pre<IUser>('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
