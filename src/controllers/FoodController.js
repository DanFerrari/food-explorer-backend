const sqliteConnection = require('../database/sqlite');
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class FoodController {

async create(request, response){
   const database = await sqliteConnection();

   const { nome,categoria,preco,ingredientes} = request.body;

   const sameIngredientName = await database.get("SELECT * FROM food WHERE nome = (?)", [nome]);
   
   if(sameIngredientName){
       throw new AppError("Esta comida já esta cadastrada!",401);
   }
   
   const insertFood = await knex("food").insert({nome,categoria,preco,ingredientes});

   return response.status(200).json("Cadastro concluido");  
        

}





} 

module.exports = FoodController;