const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const server = require('./module/details');
const Routes = require('./routers/show');
const create = require('./routers/create');
const edit = require('./routers/edit');
const connections = require('./Connection/Db');
const app = express();
app.set('connections', 'Db');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', Routes);
app.use('/delete', Routes);
app.use('/create', create);
app.use('/save', create);
app.use('/edit', edit);
app.use('/:id/edit', edit);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
