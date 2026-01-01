const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User"); // import User model

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM("PENDING", "DONE"),
    defaultValue: "PENDING"
  }
});

// Define relationships
User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

module.exports = Task;
