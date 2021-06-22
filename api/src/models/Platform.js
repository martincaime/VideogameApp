const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('platform', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};