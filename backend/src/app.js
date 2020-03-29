const express= require('express');
const routes = require('./routes');
const connection = require('./database/connexion');
const {errors} = require('celebrate');
const cors= require('cors');

const app=express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());


module.exports=app;