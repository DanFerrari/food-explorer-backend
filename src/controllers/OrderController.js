const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const sqliteConnection = require('../database/sqlite');
class OrderController {

    async create(request, response){
        const { status, detalhes, data, prato} = request.body;

            const order =  {
                status: status,
                detalhes:detalhes,                
                data:data

            };

            const notExistingFood = await knex("food").where("id",prato);

            if(!notExistingFood){
                    return response.json("Selecione um prato valido.");
            }


            await knex("order").insert(order);

            return response.status(200).json("Ordem criada");
        
        
}
}

module.exports = OrderController; 