const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ticket = require('./routes/ticket');

const app = express();

app.use(cors()) // Use this after the variable declaration

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({limit: '50mb'}));

ticket(app);

app.listen(5000, () => {
  console.log(`Example app listening at http://localhost:5000`);
});
