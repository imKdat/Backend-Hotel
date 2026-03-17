var DataTypes = require("sequelize").DataTypes;
var _booking_status = require("./booking_status");
var _bookings = require("./bookings");
var _customers = require("./customers");
var _employees = require("./employees");
var _payments = require("./payments");
var _roles = require("./roles");
var _room_status = require("./room_status");
var _room_types = require("./room_types");
var _rooms = require("./rooms");
var _users = require("./users");

function initModels(sequelize) {
  var booking_status = _booking_status(sequelize, DataTypes);
  var bookings = _bookings(sequelize, DataTypes);
  var customers = _customers(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var room_status = _room_status(sequelize, DataTypes);
  var room_types = _room_types(sequelize, DataTypes);
  var rooms = _rooms(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  bookings.belongsTo(booking_status, { as: "status", foreignKey: "status_id"});
  booking_status.hasMany(bookings, { as: "bookings", foreignKey: "status_id"});
  payments.belongsTo(bookings, { as: "booking", foreignKey: "booking_id"});
  bookings.hasMany(payments, { as: "payments", foreignKey: "booking_id"});
  bookings.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
  customers.hasMany(bookings, { as: "bookings", foreignKey: "customer_id"});
  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});
  rooms.belongsTo(room_status, { as: "status", foreignKey: "status_id"});
  room_status.hasMany(rooms, { as: "rooms", foreignKey: "status_id"});
  rooms.belongsTo(room_types, { as: "room_type", foreignKey: "room_type_id"});
  room_types.hasMany(rooms, { as: "rooms", foreignKey: "room_type_id"});
  bookings.belongsTo(rooms, { as: "room", foreignKey: "room_id"});
  rooms.hasMany(bookings, { as: "bookings", foreignKey: "room_id"});
  customers.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(customers, { as: "customer", foreignKey: "user_id"});
  employees.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(employees, { as: "employee", foreignKey: "user_id"});

  return {
    booking_status,
    bookings,
    customers,
    employees,
    payments,
    roles,
    room_status,
    room_types,
    rooms,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
