
exports.up = function(knex) {
  return knex.schema 
  .createTable('usersLogin', table => {
      table.increments();
      table.string('username', 255).notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.boolean('isAdmin').notNullable().defaultTo(false);
      // table.integer('userId').unique();
      
  }) 
  // .createTable("userCalendars" , table => {
  //   table.increments();
  //   table.integer("userCalendarId")
  //   table.integer("	userId").unique()
  //   table.integer("CalendarId")
  // })  
  .createTable("Calendars" , table => {
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

  .createTable('userCalendars', table => {
    table.increments()
    table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('usersLogin')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
   table
        .integer('calenderId')
        .unsigned()
        .references('id')
        .inTable('Calendars')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
})  
.createTable('CalendarEvents' , table => {
table.increments()
table
    .integer('calenderId')
    .unsigned()
    .references('id')
    .inTable('Calendars')
    .onDelete('CASCADE')
    .onUpdate('CASCADE');
table 
    .integer('eventsId') 
    .unsigned()
    .references('id')
    .inTable('Events')
    .onDelete('CASCADE')
    .onUpdate('CASCADE');
})
}
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("usersLogin")
  .dropTableIfExists("userCalendars") 
  .dropTableIfExists("calendars") 
  .dropTableIfExists("CalendarEvent") 
  .dropTableIfExists("Events") 
  
};
