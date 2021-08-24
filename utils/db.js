const config = require('../config/config.json');
const mysql = require('mysql');

const pool = mysql.createPool(config.poolConfig);

// Cơ chết promies
module.exports = {
    load: function (sql) {
        return new Promise((resolve, reject) => {
            pool.query(sql, (err, results, fields) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
    add: function (table, entity) {
        const sql = `INSERT INTO ${table} SET ?`;
        return new Promise((resolve, reject) => {
            pool.query(sql ,entity, (err, results, fields) => {
                if (err) return reject(err);
                resolve(results);
            });
        })
    },
    patch: function (table, entity, condition) {
        const sql = `UPDATE ${table} SET ? WHERE ?`;
        return new Promise((resolve, reject) => {
            pool.query(sql ,[entity, condition], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        })
    },
    del: function (table, condition) {
        const sql = `DELETE FROM ${table} WHERE ?`;
        return new Promise((resolve, reject) => {
            pool.query(sql , condition, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        })
    },

}

// txtCategoryName

// module.exports = {
//     load: function (sql, fn_done, fn_fail) {
//         pool.query(sql, (err, results) => {
//             if (err) { fn_fail(err); return; }
//             fn_done(results);
//         });
//     }
// }


// module.exports = {
//     load: function (sql, fn_done, fn_fail) {
//         const connection = mysql.createConnection(config.mysqlConfig);
//         connection.connect();

//         connection.query(sql, function (err, results, fields) {
//             if (err) {
//                 connection.end();
//                 fn_fail(err);
//                 return;
//             }

//             fn_done(results);
//             connection.end();
//         });
//     }
// }