const connection = require('../database/connexion');
const crypto = require('crypto');

module.exports={
    async insert_ong (request,response) {
        const {name, email, whatsapp, city, uf}=request.body;
        
        const id=crypto.randomBytes(4).toString('HEX');
    
    
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