const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const errorHandler = require('./src/helpers/errorHandler');
require('dotenv').config();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

require('./src/helpers/db');

const api = process.env.API;
app.use(`${api}/`, require('./src/routes/api.routes'));

app.use(errorHandler);
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// //Production server
var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, (err, done) => {
  if (err) {
    console.log('Error while listening port ' + app.get('port') + ' >> ' + err);
  } else {
    console.log('Server is listening at port ' + app.get('port'));
  }
});
