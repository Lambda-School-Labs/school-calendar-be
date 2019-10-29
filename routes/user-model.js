const db = require('../data/db-config.js');

module.exports ={
    add,
    find,
    findById,
    findBy,
    update,
    remove
}

function find() {
    return db('usersLogin')
    .select('id', 'username', 'password');
}
function findBy(filter) {
    return db('usersLogin')
    .where(filter);
}
function add(user) {
    return db('usersLogin')
    .insert(user, 'id')
    .then(ids => {
        const [id] = ids;
        return findById(id);
    })
}
function findById(id) {
    return db('usersLogin')
    .where({ id })
    .first();
}
function update(changes, id) {
    return db('usersLogin')
    .where('id', id)
    .update(changes)
    .then(count => {
        count > 0 ? this.get(id) : null 
    })
}
function remove(id) {
    return db('users')
    .where('id', id)
    .del();
}