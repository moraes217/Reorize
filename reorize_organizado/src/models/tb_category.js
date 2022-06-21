'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tb_user, {as: 'tb_user', foreignKey: 'id_user', onDelete: 'CASCADE'});
    }
  };
  tb_category.init({
    id_user: DataTypes.INTEGER,
    nm_category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_category',
  });
  return tb_category;
};