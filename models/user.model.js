const db = require('../utils/db');
const TBL_USERS = 'users_clc'
module.exports = {
    all: _ => db.load(`SELECT * FROM ${TBL_USERS}`),
    allWithDetails: _ => db.load(`
    SELECT c.*, COUNT(p.ProID) AS num_of_products
    FROM ${TBL_USERS} c LEFT JOIN products p ON c.CatID = p.CatID
    GROUP BY c.CatID, c.CatName`),
    single: id => db.load(`SELECT * FROM ${TBL_USERS} WHERE CatID = ${id}`),
    singleByUserName: async username => {
        const rows = await db.load(`SELECT * FROM ${TBL_USERS} WHERE username = '${username}'`)
        if (rows.length === 0) { return null }
        return rows[0];
    },
    add: (entity) => db.add(TBL_USERS, entity),
    patch: (entity) => {
        const condition = { id: entity.id }
        delete entity.id
        return db.patch(TBL_USERS, entity, condition);
    },
    del: (id) => {
        const condition = { id }
        return db.del(TBL_USERS, condition);
    },
}