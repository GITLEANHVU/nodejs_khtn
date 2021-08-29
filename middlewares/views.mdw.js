const express_handlebars_sections = require('express-handlebars-sections');
const exphbs = require('express-handlebars');
const numeral = require('numeral');

module.exports = function (app) {
    // thiết lập cho view engine express-handlebars
    app.engine('hbs', exphbs({
        extname: "hbs",
        partialsDir: "views/_partials",
        layoutsDir: "views/_layouts",
        defaultLayout: 'main.hbs',
        // Các tiện ích dùng chung tất cả các trang
        helpers: {
            section: express_handlebars_sections(),
            format_number: (number => numeral(number).format('0,0') + " VND"),
        },
    }));
    app.set('view engine', 'hbs');

}