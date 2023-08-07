class OrderController {

    async create(request, response){
        const { status, detalhes, data } = request.body;

            return response.status(201).json(`Ordem criado no dia ${data}`);

     }
}

module.exports = OrderController;