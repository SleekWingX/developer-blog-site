const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id", // Maps to the 'user_id' column in the database
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at", // Maps to the 'created_at' column in the database
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at", // Maps to the 'updated_at' column in the database
    },
  },
  {
    sequelize,
    modelName: "Post",
    timestamps: true, // Enables automatic handling of these columns
  }
);

module.exports = Post;
