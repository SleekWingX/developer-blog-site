const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/config');

class Post extends Model {}

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: true // Enables createdAt and updatedAt
});

module.exports = Post;
