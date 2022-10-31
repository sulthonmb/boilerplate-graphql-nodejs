'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Users, {
        through: models.RoleUsers,
        foreignKey: 'roleId',
        otherKey: 'userId',
      });

      this.belongsToMany(models.Actions, {
        through: 'RoleActions',
        foreignKey: 'roleId',
        otherKey: 'actionId',
      });

    }
  };

  Roles.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};