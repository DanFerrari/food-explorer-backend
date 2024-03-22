const sqliteConnection = require('../database/sqlite');
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");
const { diskStorage } = require('multer');
const DiskStorageDish = require('../providers/DiskStorageDish');
class DishController {

async create(request, response){
        const user_id = request.user.id;
        const {name,category,price,description,ingredients,image} = request.body;

            if(!ingredients){
                throw new AppError("Insira os ingredientes do prato");

            }

            const [dish_id] = await knex("dish").insert({
                name,
                category,
                price,
                description,
                image,
                user_ud,
            });

            const ingredientsInsert = ingredients.map((ingredient) => {
                return{
                    user_id,
                    dish_id,
                    name: ingredient,
                }
            });

            await knex ("ingredients").insert(ingredientsInsert)

            response.json({
                message:"Prato cadastrado com sucesso",
                dish_id,
            })
        }


async index(request, response){
    const {name , category} = request.query

    const filterCategory = category
    .split(",")
    .map((category) => category.trim());

    let dishs

    if (category){
        dishs = await knex("dish")
        .whereLike("name", `%${name}%`)
        .whereIn("category", filterCategory)
        .orderBy("name")
    }  else{
        dishs = await knex("ingredients")
        .select([
            "dish.id",
            "dish.user_id",
            "dish.name",
            "dish.category",
            "dish.price",
            "dish.description",
            "dish.image",
            "dish.created_at",
            "dish.updated_at",
        ])
        .innerJoin("dish","dish_id", "ingredients.dish_id")
        .where(function(){
            this.whereRaw("LOWER(`dish`.`name`) LIKE ?",[
                `%${name.toLowerCase()}%`,
            ]).orWhereRaw("LOWER(`ingredients`.`name`) LIKE ?",[
                `%${name.toLowerCase()}%`,
            ])
        })
        .groupBy("dish.id")
        .orderBy("dish.name")
    }


        if(!dishs){
            throw new AppError("Prato não localizado. Verifique sua busca")
        }


    response.json(dishs)




}


async show(request, response){

    const {id} = request.params;

    const dish = await knex("dish").where({id}).first()
    const ingredients = await knex("ingredients")
      .where({ dish_id:id})
      .orderBy("name")

      const DishAndIngredients = {
        ...dish,
        ingredients,
      }

      response.json(DishAndIngredients)
}

async delete(request, response){
    const diskStorageDish = new DiskStorageDish();
    const {id} = request.params;

    const dish = await knex("dish").where({id}).first();

    if(!dish) {
        throw new AppError("Prato não encontrado", 401);
    }

    diskStorageDish.deleteFile(dish.image);

    const confirmDelete = await knex("dish").where({id}).delete();

    if(confirmDelete){
        response.json({
            message:"Prato excluído",
        });
    }
}


async update(request, response) {
    const user_id = request.user.id
    const { id } = request.params
    const { name, category, ingredients, price, description, image } =
      request.body

    const dish = await knex("dish").where({ id }).first()

    if (!dish) {
      throw new AppError("Prato não encontrado", 401)
    }

    const dishIngredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name")

    if (!dishIngredients) {
      throw new AppError("Ingredientes não encontrados", 401)
    }

    dish.name = name ?? dish.name
    dish.category = category ?? dish.category
    dish.price = price ?? dish.price
    dish.description = description ?? dish.description
    dish.image = image ?? dish.image

    await knex("dish")
      .update({
        name: dish.name,
        category: dish.category,
        price: dish.price,
        description: dish.description,
        image: dish.image,
        updated_at: knex.raw(
          "strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime')"
        ),
      })
      .where({ id })

    await knex("ingredients").where({ dish_id: id }).delete()

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        dish_id: id,
        user_id,
        name: ingredient,
      }
    })

    await knex("ingredients").insert(ingredientsInsert)

    response.json({
      message: "Prato atualizado com sucesso",
    })
  }
}

module.exports = new DishController();












