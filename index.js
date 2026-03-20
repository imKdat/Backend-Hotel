const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');
const authRouter = require('./routes/authRouter');
const roomRouter = require('./routes/roomRouter');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
async function startServer() {
    try {
        // test database connection
        await sequelize.authenticate();
        console.log("✅ Database connected successfully");

    } catch (error) {
        console.error("❌ Unable to connect to database:", error);
    }
}

startServer();
app.use("/api/authentication",authRouter)
app.use("/api/room",roomRouter)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
