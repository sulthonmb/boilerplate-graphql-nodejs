'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Roles, {
        through: 'RoleActions',
        foreignKey: 'actionId',
        otherKey: 'roleId',
      });
    }
  };
  Actions.init({
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Actions',
  });
  
  return Actions;
};