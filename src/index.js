/* eslint-disable no-unused-vars */
const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  console.log('### error handler ###');
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
