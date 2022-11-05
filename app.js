const express = require("express");
const app = express();

// Routes
const tasks = require("./routes/tasks");

app.use(express.json());

app.use("/api/v1/tasks", tasks);

const port = 3000;
app.listen(port, () => console.log(`Listening to ${port}`));
