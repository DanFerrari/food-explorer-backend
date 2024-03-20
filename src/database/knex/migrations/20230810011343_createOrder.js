exports.up = knex => knex.schema.createTable("order", table=>{

    table.increments("id").primary();
    table.boolean("orderCompleted").default(false);
    table.enum("paymentType", ["creditCard","pix"], {useNative: true, enumName: "typesOfPayments"}).notNullable();
    table.float("payment");  
    table.integer("user_id").unsigned().references("id").inTable("users");   
    table.timestamp("date").default(knex.fn.now()); 
    table.timestamp("created_at").defaultTo(knex.raw("(strftime('%d/%m/%Y %H:%M:%S', 'now', 'localtime'))"));
   
    });
    
    exports.down = knex => knex.schema.createTable("order");