const express = require('express');
require('express-async-errors');

const app = express();

// thay thế cho body-paser để lấy dữ liệu form gửi lên server
app.use(express.urlencoded({ extended: true, }));

//Cài đặt public folder
app.use('/public', express.static('public'));

require('./middlewares/session.mdw')(app);
require('./middlewares/locals.mdw')(app);
require('./middlewares/views.mdw')(app);

// Home page
app.get('/', (req, res) => { res.redirect("/home"); });
app.get('/home', (req, res) => { res.render('home'); });
// app.get('/about', (req, res) => { res.render('about'); });


// routes ? Admin
app.use("/admin/categories", require('./routes/category.route'));
app.use("/admin/products", require('./routes/product.route'));

// routes ? customer
app.use("/products", require('./routes/_product.route'));
app.use("/account", require('./routes/_account.route'));


// Dùng mặc định sẽ hiển thị trang lỗi, và layout cho  main sẽ không được load
app.use((req, res) => { res.render("404", { layout: false }); });

// handle error 505
app.get('/err', function (req, res) {
    throw new Error("Beng beng");
});

// tạo middleware cho lỗi 505, nếu sai gì đó sẽ tự động load trang này
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).render("505", { layout: false });
});

// Khởi chạy server
const PORT = 3030;
app.listen(PORT, function () {
    console.log(`Link: http://localhost:${PORT}`);
});