exports.up = knex => knex.schema.createTable("order", table=>{

    table.increments("id");
    table.text("status");
    table.text("detalhes");
    table.timestamp("data").default(knex.fn.now());
    
    
    
    
    
    
    
    
    });
    
    exports.down = knex => knex.schema.createTable("order");