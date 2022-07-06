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

router.get('/:ID', async(req, res) => {
    let id = req.params.ID;
    try {
        // if (req.session.user) {
        //     if (req.session.user.admin == true) {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${process.env.PG_DB_TABLE} WHERE id = ${id} ORDER BY id ASC`);
        const results = { 'results': (result) ? result.rows : null };
        let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
        pool.query(getArticlesQuery, (error, articles) => {
            if (error) {
                console.log(error);
                res.send("Error " + error);
            } else {
                res.json(results.results[0])
            }
        })
        client.release();
        //     } else {
        //         pool.query(getArticlesQuery, (error, articles) => {
        //             if (error) {
        //                 console.log(error);
        //                 res.send("Error " + error);
        //             } else {
        //                 res.render('pages/unauthorized.ejs', { pageTitle: "user", user: req.session.user, footerArticles: articles.rows });
        //             }
        //         })
        //     }
        // } else {
        //     pool.query(getArticlesQuery, (error, articles) => {
        //         if (error) {
        //             console.log(error);
        //             res.send("Error " + error);
        //         } else {
        //             res.render('pages/unauthorized.ejs', { pageTitle: "user", user: null, footerArticles: articles.rows })
        //         }
        //     })
        // }
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})

router.get('/', (req, res) => {
    let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
    pool.query(getArticlesQuery, (error, articles) => {
        if (error) {
            console.log(error);
            res.send("Error " + error);
        } else {
            if (req.session.user) {
                if (req.session.user.admin) {
                    res.render('pages/noUser.ejs', { pageTitle: "user", user: req.session.user, footerArticles: articles.rows });
                } else {
                    res.render('pages/unauthorized.ejs', { pageTitle: "user", user: req.session.user, footerArticles: articles.rows });
                }
            } else {
                res.render('pages/unauthorized.ejs', { pageTitle: "user", user: null, footerArticles: articles.rows });
            }
        }
    })
})

module.exports = router;