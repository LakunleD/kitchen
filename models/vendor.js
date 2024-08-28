'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vendor.hasMany(models.MenuItem, { foreignKey: 'vendor_id' });
    }
    validPassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }
  Vendor.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Vendor',
    hooks: {
      beforeCreate: async (vendor) => {
        vendor.password = await bcrypt.hash(vendor.password, 10);
      },
    },
  });
  return Vendor;
};