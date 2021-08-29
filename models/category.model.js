const db = require('../utils/db');
const TBL_CATEGORIES = 'categories'
module.exports = {
    all: _ => db.load(`SELECT * FROM ${TBL_CATEGORIES}`),
    allWithDetails: _ => db.load(`
    SELECT c.*, COUNT(p.ProID) AS num_of_products
    FROM ${TBL_CATEGORIES} c LEFT JOIN products p ON c.CatID = p.CatID
    GROUP BY c.CatID, c.CatName`),
    single: id => db.load(`SELECT * FROM ${TBL_CATEGORIES} WHERE CatID = ${id}`),
    add: (entity) => db.add(TBL_CATEGORIES, entity),
    patch: (entity) => {
        const condition = { CatID: entity.CatID }
        delete entity.CatID
        return db.patch(TBL_CATEGORIES, entity, condition);
    },
    del: (id) => {
        const condition = { CatID: id }
        return db.del(TBL_CATEGORIES, condition);
    },
}