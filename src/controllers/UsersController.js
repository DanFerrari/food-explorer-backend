const {hash, compare} = require("bcryptjs");

const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");


class UsersController{

async create(request,response){
    const {name, email, password} = request.body;
    
    const database = await sqliteConnection();





    return response.status(201).json("Usuario Criado");


}
 

}

module.exports = UsersController;