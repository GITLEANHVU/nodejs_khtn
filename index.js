const db = require('./utils/db');

const log = console.log;

// const fn_done = (result) => log(result);

// const fn_fail = (err) => log(err.sqlMessage);

// db.load("SELECT * FROM categories", fn_done, fn_fail);


// tự động chạy 1 trong 2 (resolve, reject)
const getCategories = async () => {
    const categories = await db.load("SELECT * FROM categories");
    log(categories);
}

getCategories();

// done thì chạy resolve fail thì chạy reject
// db.load("SELECT * FROM categories")
//     .then(function (result) {
//         log(result);
//     })
//     .catch(function (err) {
//         log(err.sqlMessage);
//     })
//     .finally(function () {
//         log("Finally!");
//     })
// // 