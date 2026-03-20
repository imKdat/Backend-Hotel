const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bookings', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rooms',
        key: 'id'
      }
    },
    check_in: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    check_out: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'booking_status',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'bookings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "customer_id",
        using: "BTREE",
        fields: [
          { name: "customer_id" },
        ]
      },
      {
        name: "room_id",
        using: "BTREE",
        fields: [
          { name: "room_id" },
        ]
      },
      {
        name: "status_id",
        using: "BTREE",
        fields: [
          { name: "status_id" },
        ]
      },
    ]
  });
};
