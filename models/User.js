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
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    hooks: {
        // before record creation, hash password
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
            return user;
        }
    }
});

module.exports = User;
