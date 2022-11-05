const express = require("express");
const app = express();

const connectDB = require("./db/connect");
require("dotenv").config(process.env.MONGO_URI);

const tasks = require("./routes/tasks");

// Middleware
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Routes
app.use("/api/v1/tasks", tasks);

(async () => {
  try {
    const port = 3000;
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Listening to ${port}`));
  } catch (error) {
    console.log(error);
  }
})();
