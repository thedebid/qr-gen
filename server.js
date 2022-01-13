const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

require("./src/helpers/db");

const api = process.env.API;
app.use(`${api}/`, require("./src/routes/api.routes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
