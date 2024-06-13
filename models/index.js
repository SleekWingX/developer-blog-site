const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Define model associations

Post.belongsTo(User, { 
    foreignKey: "userId",  
    onDelete: "CASCADE"
});

Comment.belongsTo(User, { 
    foreignKey: "userId",  
    onDelete: "CASCADE"
 });

Post.hasMany(Comment, { 
    foreignKey: "postId" 
});

// Export models and sequelize instance
module.exports = {
  User,
  Post,
  Comment,
};
