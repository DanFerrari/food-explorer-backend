class UsersController{

async create(request,response){
    const {name, email, password} = request.body;
        
    return response.status(201).json("Usuario Criado");


}


}

module.exports = UsersController;