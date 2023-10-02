import mongoose, { Document, Schema } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IComment extends Document {
  body: string;
  createdAt: Date;
  updatedAt: Date;
  user: mongoose.Types.ObjectId;
  issue: mongoose.Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
  body: {
    type: String,
    required: true,
    maxlength: 50000,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  issue: {
    type: mongoose.Types.ObjectId,
    ref: 'Issue',
    required: true,
  },
});

// If you want to automatically update the `updatedAt` field on save, you can use a pre-save hook:
// eslint-disable-next-line func-names
CommentSchema.pre<IComment>('save', function(next) {
  if (this.isModified('body')) {
    this.updatedAt = new Date();
  }
  next();
});

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
