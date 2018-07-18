'use strict';

module.exports = function(sequelize, DataTypes) {
  const Hotel = sequelize.define('hotel', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    }
  });

  return Hotel;
};
