//Conectdb
const { db } = require('../Conectdb/dataBase');
const cors = require('cors');
const express = require('express');
const initModel = require('./initModel');
const { usersRouter } = require('../routes/userRoutes');
const { globalErrorHandler } = require('../Controllers/errorController');
const { restaurantRouter } = require('../routes/restaurantRoutes');

class server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //path Routes
    this.paths = {
      user: '/api/v1/users',
      restaurant: '/api/v1/restaurants',
      meal: '/api/v1/meals',
      order: '/api/v1/orders',
    };
    //Connect to db
    this.Conectdb();

    //Middlawares
    this.middlawares();

    //this Routes
    this.routes();

    middlawares();
    this.app.use(cors());
    this.app.use(express.json());

    routes();
    this.app.use(this.paths.user, usersRouter);
    this.app.use(this.paths.restaurant, restaurantRouter);

    this.app.use('*', globalErrorHandler);
  }
  //Authenticate database credencials
  database() {
    db.authenticate()
      .then(() => console.log('DataBase authenticate'))
      .catch(err => console.log(err));

    //Relations
    initModel();

    // Sync sequelize models
    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }
  // Spin up server
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });
  }
}
module.exports = server;
