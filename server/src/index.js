const express = require("express");
const route = require("./routes/index");
const cors = require("cors");

const db = require("./config/db/index");
db.connect();
const app = express();
app.use(express.json());
app.use(cors());

route(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT} `));
