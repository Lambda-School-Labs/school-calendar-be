const db = require('../data/db-config.js'); 

module.exports = {
get ,
getById,
add,
remove,
update
} 

function get(){
    return db('calender')
    .select('calenderName')
} 
function getById(calId){
  return db('calender')
   .where('calId' , calId);
} 
function add(calender){
  return db('calender')
  .insert(calender , 'calId')
} 
function remove(calId){
  return db('calId') 
  .where({calId})
  .del();
} 
function update(calId , updated){
    return db('calender')
    .where({calId})
    .update(updated)
}