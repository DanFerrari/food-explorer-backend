const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const DiskStorageDish = require("../providers/DiskStorageDish")

class ImageController {
  async update(request, response) {
    const {dish_id} = request.params
    const imageDishName = request.file.filename
    const diskStorageDish = new DiskStorageDish()

    const dish = await knex("dish").where({ id: dish_id }).first()


    if (!dish) {
      throw new AppError("Prato não localizado", 401)
    }

    if(dish.image){
      await diskStorageDish.deleteFile(dish.image)
    }

    const fileName = await diskStorageDish.saveFile(imageDishName)

    await knex("dish").update({
      image: fileName,
      updated_at: knex.raw("strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime')"),
    })
    .where({id: dish_id})

    const dishUpdate = await knex("dish").where({id: dish_id}).first()

    response.json(dishUpdate)
  }
}

module.exports = new ImageController()
