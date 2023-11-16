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

const ProjectSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true,
    },
    url: String,
    description: String,
    category: {
      type: String,
      enum: Object.values(ProjectCategory),
      required: true,
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
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
