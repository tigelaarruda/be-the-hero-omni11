const express= require('express');
const crypto = require('crypto');

const ong_controller=require('./controller/ong_controller');
const incident_controller=require('./controller/incident_controller');
const profile_controller=require('./controller/profile_controller');
const session_controller=require('./controller/session_controller')


const connection = require('./database/connexion');

const routes= express.Router();

routes.post('/sessions',session_controller.create_session); 

routes.post('/ongs', ong_controller.insert_ong);
routes.get('/ongs', ong_controller.get_ongs);

routes.post('/incidents',incident_controller.insert_incident);
routes.get('/incidents',incident_controller.get_incidents);
routes.delete('/incidents/:id',incident_controller.delete_incidents);

routes.get('/profile',profile_controller.profile_incidents);


module.exports = routes;