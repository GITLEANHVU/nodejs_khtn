const express = require('express');
const categoryModel = require('../models/category.model');

const router = express.Router();

router.get('/', async function (req, res) {
    const list = await categoryModel.all();
    res.render('vwCategories/list', {
        categories: list,
        empty: list.length === 0
    });
});

// route thêm mới category
router.get('/add', function (req, res) {
    res.render('vwCategories/add');
});

// Route nhận liệu để thêm mới category
router.post('/add', async function (req, res) {
    await categoryModel.add(req.body)
    res.render('vwCategories/add');
});

// Route nhận id và hiển thị category cần edit
router.get('/edit', async function (req, res) {
    const id = Number(req.query.id) || -1;
    const category = await categoryModel.single(id);
    if (category.length === 0) return res.send("Invalid parameter");
    res.render('vwCategories/edit', { category: category[0] });
});

// Route Delete
router.post('/del', async function (req, res) {
    await categoryModel.del(req.body.CatID);
    res.redirect('/admin/categories');
});
// Route Update
router.post('/update', async function (req, res) {
    await categoryModel.patch(req.body);
    res.redirect('/admin/categories');
});


module.exports = router;


// const list = [
//     { CatID: 1, CatName: "laptop" },
//     { CatID: 2, CatName: "Smartphone" },
//     { CatID: 3, CatName: "Tablet" },
// ];