const express = require('express');
const productModel = require('../models/product.model');
const config = require('../config/default.json')
const router = express.Router();

router.get('/byCat/:catId', async function (req, res) {

    // lấy cat ID dựa theo params    
    let catID = req.params.catId;


    // thêm isActive cho category nào được chọn
    // vì mảng từ số 0 nên mình sẽ catID - 1 để ra kết quả đúng với phần tử trong mảng
    res.locals.lcCategories[catID - 1].isActive = true;



    const limit = config.pagination.limit;
    let page = Number(req.query.page) || 1;
    if (page < 0) page = 1;
    const offset = (page - 1) * limit;

    // lấy danh sách sản phẩm sẽ được hiển thị trên giao diện, không phân trang
    // const list = await productModel.allByCat(catID);
    // lâyd danh sách dựa trên id và option để phân trang
    // const list = await productModel.pageByCat(catID, limit, offset);
    // lấy tổng của product by CatID
    // const total = await productModel.countByCatID(catID);
    const [list, total] = await Promise.all([
        productModel.pageByCat(catID, limit, offset),
        productModel.countByCatID(catID)
    ]);

    // test nếu phân trang bị tràn
    // const nPages = 30;
    const nPages = Math.ceil(total / limit);
    let page_items = [];
    const list1 = [];
    const list2 = [];
    const list3 = [];

    if (nPages < 30) {
        for (let i = 1; i <= nPages; i++) {
            page_items.push({
                value: i,
                isActive: i === page
            })
        }
    } else {
        for (let i = 1; i <= nPages; i++) {
            if (i <= 5) {
                list1.push({
                    value: i,
                    isActive: i === page
                });
            }
            if (i > page - 3 && i < page + 3) {
                list2.push({
                    value: i,
                    isActive: i === page
                });
            }
            if (i > nPages - 5) {
                list3.push({
                    value: i,
                    isActive: i === page
                });
            }
        }
        page_items = [
            ...list1,
            {
                value: '...',
                isActive: false,
                isDisabled: true
            },
            ...list2,
            {
                value: '...',
                isActive: false,
                isDisabled: true
            },
            ...list3
        ];
    }

    res.render('vwProducts/byCat', {
        products: list,
        empty: list.length === 0,
        page_items: page_items,
        prev_value: page - 1,
        next_value: page + 1,
        is_disabled_prev: page > 1,
        is_disabled_next: page < nPages,
    });
});

module.exports = router;