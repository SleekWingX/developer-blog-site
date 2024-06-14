const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define model associations

Post.belongsTo(User, { 
    foreignKey: "user_id",  
    onDelete: "CASCADE"
});

Comment.belongsTo(User, { 
    foreignKey: "user_id",  
    onDelete: "CASCADE"
 });

Post.hasMany(Comment, { 
    foreignKey: "post_id" 
});

// Export models and sequelize instance
module.exports = {
  User,
  Post,
  Comment,
};
