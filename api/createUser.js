const mongoose = require('mongoose');
const { exit } = require('process');

const createDatabaseConnection = async () => {
    try {
      await mongoose.connect("mongodb://0.0.0.0:27017");
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };

createDatabaseConnection();

const UserSchema = new mongoose.Schema(
    {
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
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            required: true,
        },
        avatarUrl: {
            type: String,
            maxlength: 2000,
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
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', UserSchema);

User.create({
    "name": "test user",
    "email": "test@mail.com",
    "isAdmin": true,
    "password": "$2b$10$yjZoGbAHHwVZUGiX1ttkS.CCHi7RAT.nawrs343WageepB5kmhc/S",
    "comments": [],
    "issues": [],
    "projects": [],
    "__v": 0
}).then( () => {
    exit();
})
