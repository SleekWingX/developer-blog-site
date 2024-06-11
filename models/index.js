const { sequelize } = require('../config/config');

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define model associations
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

// Export models and sequelize instance
module.exports = {
    sequelize,
    User,
    Post,
    Comment
};
