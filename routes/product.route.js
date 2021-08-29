const express = require('express');
const productModel = require('../models/product.model');

const router = express.Router();

router.get('/', async function (req, res) {
    let list = await productModel.all();
    
    list.map(function (product) {
        product.f_Price = product.Price + " đ";
    });

    res.render('vwProducts/list', {
        products: list,
        empty: list.length === 0
    });
});

module.exports = router;