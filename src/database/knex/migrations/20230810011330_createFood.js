exports.up = knex => knex.schema.createTable("dish", table=>{

table.increments("id");
table.text("name");
table.text("category");
table.text("price");
table.text("dish_image");
table.text("description").notNullable();








});

exports.down = knex => knex.schema.createTable("dish");