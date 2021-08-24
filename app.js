const express = require('express');
const exphbs = require('express-handlebars');

const PORT = 3030;
const app = express();

// thay thế cho body-paser để lấy dữ liệu form gửi lên server
app.use(express.urlencoded({
    extended: true,
}))


// app.engine('handlebars', exphbs());
app.engine('hbs', exphbs({
    extname: "hbs",
    partialsDir: "views/_partials",
    layoutsDir: "views/_layouts",
    defaultLayout: 'main.hbs',
}));
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
});

// routes
app.use("/admin/categories", require('./routes/category.route'));
app.use("/admin/products", require('./routes/product.route'));
// default route
app.use((req, res) => {
    res.render("404", { layout: false });
})
// customer
// app.get('/', (req, res) => {
//     res.redirect("/home");
// });

// app.get('/home', (req, res) => {
//     res.render('home');
// });

// app.get('/about', (req, res) => {
//     res.render('about');
// });