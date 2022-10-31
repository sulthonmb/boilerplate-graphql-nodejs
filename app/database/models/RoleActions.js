'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleActions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Roles, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      this.belongsTo(models.Actions, {
        foreignKey: 'actionId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  RoleActions.init({
    actionId: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoleActions',
  });
  return RoleActions;
};