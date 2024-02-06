exports.up = knex => knex.schema.createTable("order_details", table=>{

    table.increments("id");  
    table.integer("order_id").references("id").inTable("order");
    table.integer("food_id").references("id").inTable("food");
    table.integer("quantity");   
       
    });
    
    exports.down = knex => knex.schema.createTable("order_details");