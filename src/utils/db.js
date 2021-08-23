const config = require('../config/config.json');
const mysql = require('mysql');

const pool = mysql.createPool(config.poolConfig);

// Cơ chết promies
module.exports = {
    load: function (sql) {
        return new Promise((resolve, reject) => {
            pool.query(sql, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        
    }
}


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