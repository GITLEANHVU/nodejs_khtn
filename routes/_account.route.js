const express = require('express');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const config = require('../config/default.json')
const restrict = require('../middlewares/auth.mdw');

const router = express.Router();

router.get('/login', async function (req, res) {
    res.render('vwAccount/login', { layout: false });
});
router.post('/login', async function (req, res) {
    const user = await userModel.singleByUserName(req.body.username);
    console.log("user: ", user);
    if (user === null) {
        return res.render('vwAccount/login', { layout: false, error: 'Invalid username or password' });
    }
    const rs = bcrypt.compareSync(req.body.password, user.password_hash);
    console.log("results", rs);
    if (rs === false) {
        return res.render('vwAccount/login', { layout: false, error: 'Invalid password' });
    }
    delete user.password_hash;
    req.session.isAuthenticated = true;
    req.session.authUser = user;

    const url = req.query.retUrl || '/';
    res.redirect(url);
});


router.get('/logout', restrict, async function (req, res) {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    // đưa về trang cũ trước đó khi logout
    res.redirect(req.headers.referer);
});

router.get('/register', async function (req, res) {
    res.render('vwAccount/register');
});
// nhan du lieu va xu ly dang ky nguoi dung
router.post('/register', async function (req, res) {
    const dob = moment(req.body.dob, "DD/MM/YYYY").format('YYYY-MM-DD');
    const password_hash = bcrypt.hashSync(req.body.password, config.authentication.saltRounds);
    const entity = {
        username: req.body.username,
        password_hash,
        name: req.body.name,
        email: req.body.email,
        dob,
        permission: 0,
    }
    console.log(entity)
    await userModel.add(entity);
    res.render('vwAccount/register');
});


router.get('/profile', restrict, async function (req, res) {
    console.log(req.session)
    console.log(req.session.authUser)
    res.render('vwAccount/profile');
});


router.get('/test', async function (req, res) {
    const user = await userModel.singleByUserName(req.query.username);
    if (!user) {
        return res.json(true);
    }

    res.json(false);
});


module.exports = router;