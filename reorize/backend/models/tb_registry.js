'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_registry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tb_registry.init({
    id_account: DataTypes.INTEGER,
    desc_registry: DataTypes.STRING,
    id_category: DataTypes.INTEGER,
    vl_registry: DataTypes.FLOAT,
    type_registry: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_registry',
  });
  return tb_registry;
};