const connection = require('../database/connexion');
const crypto = require('crypto');
const generateUniqueId= require('../utils/generateUniqueId');

module.exports={
    async insert_ong (request,response) {
        const {name, email, whatsapp, city, uf}=request.body;
        
        const id=generateUniqueId();
    
        
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        
        return response.json({id});
    },

    async get_ongs (request,response)  {
        const ongs = await connection('ongs').select('*');
        
        return response.json({ongs});
    }
};