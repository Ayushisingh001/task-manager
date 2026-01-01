require("dotenv").config();

const sequelize = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }) // ✅ DO NOT use force:true
  .then(() => {
    console.log("DB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("DB connection failed:", err);
  });
