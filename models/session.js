const Sequelize = require('sequelize');
module.exports = (sequelize) => {
  const Session = sequelize.define('Session', {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    userId: Sequelize.INTEGER,
    expires: Sequelize.DATE,
    data: Sequelize.TEXT
  });

  return Session;
};
