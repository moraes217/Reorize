'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_goal.init({
    id_account: DataTypes.INTEGER,
    id_category: DataTypes.INTEGER,
    vl_goal: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'tb_goal',
  });
  return tb_goal;
};