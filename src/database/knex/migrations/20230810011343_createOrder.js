exports.up = knex => knex.schema.createTable("order", table=>{

    table.increments("id").primary();
    table.text("status");
    table.text("details");
    table.integer("user_id").unsigned().references("id").inTable("users");   
    table.timestamp("date").default(knex.fn.now());    
    });
    
    exports.down = knex => knex.schema.createTable("order");