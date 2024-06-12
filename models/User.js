const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/config');

class User extends Model {
    // Check password validity
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init({
    // Model attributes are defined here
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'username',
        validate: {
            isAlphanumeric: true, // usernames can only contain letters and numbers
            len: [4,30] // usernames must be between 4 and 30 characters long
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password',
        validate: {
            len: [8,100] // passwords must be between 8 and 100 characters long
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'updated_at'
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
        // before record creation, hash password
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
            return user;
        }
    }
});

module.exports = User;
