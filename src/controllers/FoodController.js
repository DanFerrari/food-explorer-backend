const sqliteConnection = require('../database/sqlite');
const knex = require("../database/knex");


class FoodController {

async create(request, response){
   const database = await sqliteConnection();

   const { nome,categoria,preco,ingredientes} = request.body;

   const sameIngredientName = await database.get("SELECT * FROM food WHERE nome = (?)", [nome]);
   
   if(sameIngredientName){
        return response.status(401).json({error: "Food already exists"});
   }
   
   const insertFood = await knex("food").insert({nome,categoria,preco,ingredientes})


   


   return response.status(200).json("Parabens deu certo!!!!");

   
        

}





} 

module.exports = FoodController;