const {hash, compare} = require("bcryptjs");

const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");


class UsersController{


async create(request,response){

    
    const {name, email, password} = request.body;
    
    const database = await sqliteConnection();

    const checkUserExits = await database.get("SELECT * FROM users WHERE email =(?)", [email]);

    if(checkUserExits){
        throw new AppError("Este e-mail já está em uso");
       
    }

    const hashedPassword = await hash(password,8);

    const userId = await database.run("INSERT INTO users (name,email,password) VALUES(?,?,?)",[name,email,hashedPassword]); 
   
   





    return response.status(201).json("Usuario Criado");


}
 

}

module.exports = UsersController;