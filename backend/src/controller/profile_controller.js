const connection = require('../database/connexion'); 

module.exports={

    async profile_incidents(request,response){
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id',ong_id)
            .select('*');

        return response.json(incidents);
    }
}