exports.up = knex => knex.schema.createTable("food", table=>{

table.increments("id");
table.text("nome");
table.text("categoria");
table.text("preco");
table.text("ingredientes");








});

exports.down = knex => knex.schema.createTable("food");