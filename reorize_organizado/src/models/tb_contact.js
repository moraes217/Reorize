'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tb_user, {as: 'tb_user', foreignKey: 'id_user'});
    }
  };
  tb_contact.init({
    id_user: DataTypes.INTEGER,
    subject_contact: DataTypes.STRING,
    desc_contact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_contact',
  });
  return tb_contact;
};