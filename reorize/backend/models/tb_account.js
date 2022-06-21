'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_account.init({
    id_user: DataTypes.INTEGER,
    nm_account: DataTypes.STRING,
    balance_account: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'tb_account',
  });
  return tb_account;
};