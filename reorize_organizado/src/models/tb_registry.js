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
      this.belongsTo(models.tb_account, {as: 'tb_account', foreignKey: 'id_account', onDelete: 'CASCADE'});
      this.belongsTo(models.tb_category, {as: 'tb_category', foreignKey: 'id_category', onDelete: 'CASCADE'});
    }
  };
  tb_registry.init({
    id_account: DataTypes.INTEGER,
    desc_registry: DataTypes.STRING,
    id_category: DataTypes.INTEGER,
    vl_registry: DataTypes.FLOAT,
    dt_registry: DataTypes.DATE,
    type_registry: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_registry',
  });
  return tb_registry;
};