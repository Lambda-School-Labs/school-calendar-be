
exports.up = function(knex) {
  return knex.schema 
  .createTable('users', table => {
      table.increments();
      table.string('name', 255).notNullable();
      table.string('username', 255).notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.boolean('isAdmin').notNullable().defaultTo(false);
      
  }) 
  .createTable("calendars" , table => {
     table.increments();
    //  table.string("calendarName")
     table.integer("calendarId")
  })    
  .createTable("Events" , table => {
    // table.increments();
    table.integer("eventId")
    table.increments('eventName')
    table.increments('eventInfo')
  })
  .createTable('calendarEvents' , table => {
    table.increments()
    table
      .integer('calenderId')
      .unsigned()
      .references('id')
      .inTable('calendars')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table 
      .integer('eventsId') 
      .unsigned()
      .references('id')
      .inTable('events')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
}
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("calendarEvents")
    .dropTableIfExists("events") 
    .dropTableIfExists("adminCalendars") 
    .dropTableIfExists("userCalendars")
    .dropTableIfExists("calendars") 
    .dropTableIfExists("users")
};
