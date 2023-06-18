require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4500;
const corsOptions = require("./config/allowedOrigins");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//connect to db
connectDB();

app.use("/", require("./routes/user"));

app.all("*", (req, res) => {
  res.status(404);
});

//global error handler
app.use(errorHandler);

const server=app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
