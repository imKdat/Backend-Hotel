const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rooms', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    room_number: {
      type: DataTypes.STRING(10),
      allowNull: true,
      unique: "room_number"
    },
    room_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'room_types',
        key: 'id'
      }
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'room_status',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'rooms',
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
        name: "room_number",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "room_number" },
        ]
      },
      {
        name: "room_type_id",
        using: "BTREE",
        fields: [
          { name: "room_type_id" },
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
