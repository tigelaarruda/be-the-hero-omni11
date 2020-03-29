const express= require('express');
const crypto = require('crypto');
const { celebrate, Segments, Joi} = require ('celebrate');

const ong_controller=require('./controller/ong_controller');
const incident_controller=require('./controller/incident_controller');
const profile_controller=require('./controller/profile_controller');
const session_controller=require('./controller/session_controller')


const connection = require('./database/connexion');

const routes= express.Router();

routes.post('/sessions',session_controller.create_session); 

routes.post('/ongs', celebrate({
    [Segments.BODY]:Joi.object().keys({
            name: Joi.string().required(),
                email: Joi.string()
                    .required()
                    .email(),
                whatsapp: Joi.string()
                    .required()
                    .min(10)
                    .max(11),
                city: Joi.string().required(),
                uf: Joi.string()
                    .required()
                    .length(2)
        })
    }),
ong_controller.insert_ong);
routes.get('/ongs', ong_controller.get_ongs);

routes.post('/incidents',celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),
incident_controller.insert_incident);


routes.get('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()
         })
        }),  
    incident_controller.get_incidents);

routes.delete('/incidents/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()}
        )
    }),incident_controller.delete_incidents);

routes.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),profile_controller.profile_incidents);


module.exports = routes;