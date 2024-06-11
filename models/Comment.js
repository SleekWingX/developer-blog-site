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
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: true // Enables createdAt and updatedAt
});

module.exports = Comment;
