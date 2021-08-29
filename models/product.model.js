const db = require('../utils/db');

const TBL_PRODUCTS = "products";

module.exports = {
    all: _ => db.load(`SELECT * FROM ${TBL_PRODUCTS}`),
    allByCat: catId => db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE CatID = ${catId}`),
    pageByCat: (catId, limit, offset) => db.load(`SELECT * FROM ${TBL_PRODUCTS} WHERE CatID = ${catId} LIMIT ${limit} OFFSET ${offset}`),
    countByCatID: async (catId) => {
        const rows = await db.load(`SELECT count(*) AS total FROM ${TBL_PRODUCTS} WHERE CatID = ${catId}`)
        return rows[0].total;
    }
}