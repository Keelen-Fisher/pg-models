'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const peopleSchema = require('./');

//  'postgres://localhost:5432/api-app'
// with password: 'postgres://username:password@localhost:5432/api-app'
// ternary: WTF what(conditional) ? return if TRUE : else return if FALSE
const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite:memory'
  : process.env.DATABASE_URL;

// instantiates our database
const sequelizeDatabase = new Sequelize(DATABASE_URL);

// create PeopleModel with our Schema
const PeopleModel = peopleSchema(sequelizeDatabase, DataTypes);

// creates all associated tables 
sequelizeDatabase.sync()
  .then(() => console.log('Successful Connection!'))
  .catch(err => console.error(err));

// to run this after you have created the sync function -> node src/models/index.js

module.exports = { sequelizeDatabase, PeopleModel };
