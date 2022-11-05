const express = require("express");
const app = express();

const connectDB = require("./db/connect");
require("dotenv").config(process.env.MONGO_URI);

const tasks = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// Middleware
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandler);

(async () => {
  try {
    const port = process.env.PORT || 3000;
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Listening to ${port}`));
  } catch (error) {
    console.log(error);
  }
})();
