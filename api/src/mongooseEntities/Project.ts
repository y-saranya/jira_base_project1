/* eslint-disable func-names */
import mongoose, { Document, Schema } from 'mongoose';
import { ProjectCategory } from 'constants/projects';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IProject extends Document {
  name: string;
  url?: string;
  description?: string;
  category: ProjectCategory;
  createdAt: Date;
  updatedAt: Date;
  issues: mongoose.Types.ObjectId[];
  users: mongoose.Types.ObjectId[];
}

const ProjectSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  url: String,
  description: String,
  category: {
    type: String,
    enum: Object.values(ProjectCategory),
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  issues: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Issue',
    },
  ],
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// Automatically update the `updatedAt` field on save
ProjectSchema.pre<IProject>('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Project = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
