class FoodController {

async create(request, response){
   const { nome,categoria,preco,ingrediente} = request.body;

        return response.status(201).json("Prato Criado");

}





}

module.exports = FoodController;