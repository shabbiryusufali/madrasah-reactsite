//const { ZoomMtg } = require('@zoomus/websdk');
require('dotenv').config()
const express = require("express");
const router = express.Router();
const cors = require('cors');
const pool = require('../db');

router.use(express.json(), cors());
router.options('*', cors())
    //middle ware
router.use((req, res, next) => {
    //console.log("zoom.js")
    next()
})

router.get('/', async(req, res) => {
    let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
    pool.query(getArticlesQuery, (error, articles) => {
        if (error) {
            console.log(error);
            res.send("Error " + error);
        } else {
            if (req.session.user) {
                res.render('pages/dashboard.ejs', { pageTitle: "dashboard", user: req.session.user, action: null, footerArticles: articles.rows })
            } else {
                res.render('pages/dashboard.ejs', { pageTitle: "dashboard", user: null, action: null, footerArticles: articles.rows })
            }
        }
    })

})
router.get('/newUser', async(req, res) => {
    let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
    pool.query(getArticlesQuery, (error, articles) => {
        if (error) {
            console.log(error);
            res.send("Error " + error);
        } else {
            if (req.session.user) {
                res.render('pages/dashboard.ejs', { pageTitle: "dashboard", user: req.session.user, action: "newuser", footerArticles: articles.rows })
            } else {
                res.render('pages/dashboard.ejs', { pageTitle: "dashboard", user: null, action: null, footerArticles: articles.rows })
            }
        }
    })

})


module.exports = router;