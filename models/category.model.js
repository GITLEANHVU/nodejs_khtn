const db = require('../utils/db');
const TBL_CATEGORIES = 'categories'
module.exports = {
    all: _ => db.load(`SELECT * FROM ${TBL_CATEGORIES}`),
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