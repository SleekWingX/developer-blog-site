const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

class Comment extends Model {}

Comment.init({
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Post',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Comment',
    timestamps: true // Enables createdAt and updatedAt
});

module.exports = Comment;
