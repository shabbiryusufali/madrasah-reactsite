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

    try {
        if (req.session.user) {
            if (req.session.user.admin) {
                const client = await pool.connect();
                const result = await client.query(`SELECT * FROM ${process.env.PG_DB_TABLE} ORDER BY id ASC`);
                const results = { 'results': (result) ? result.rows : null };
                let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
                pool.query(getArticlesQuery, (error, articles) => {
                    if (error) {
                        console.log(error);
                        res.send("Error " + error);
                    } else {
                        res.json({ results: results.results })
                    }
                })
                client.release();

            } else {
                res.redirect('/unauthorized')
            }
        } else {
            res.redirect('/unauthorized')
        }
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})

router.get('/search', async(req, res) => {


    let columnToSearch = req.query.column;
    let searchQuery = req.query.searchQuery;
    try {
        if (req.session.user) {
            if (req.session.user.admin == true) {
                const client = await pool.connect();
                var results;
                if (columnToSearch == 'admin' || columnToSearch == 'verified' ||  columnToSearch == 'librarian' || columnToSearch == 'id' || columnToSearch == 'student' || columnToSearch == 'teacher' || columnToSearch == 'alumn') {
                    const result = await client.query(`SELECT * FROM ${process.env.PG_DB_TABLE} WHERE ${columnToSearch} = ${searchQuery} ORDER BY id ASC`);
                    results = { 'results': (result) ? result.rows : null };
                } else {
                    const result = await client.query(`SELECT * FROM ${process.env.PG_DB_TABLE} WHERE ${columnToSearch} LIKE '%${searchQuery}%' ORDER BY id ASC`);
                    console.log(`SELECT * FROM ${process.env.PG_DB_TABLE} WHERE ${columnToSearch} LIKE '%${searchQuery}%' ORDER BY id ASC`);
                    results = { 'results': (result) ? result.rows : null };
                }
                let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
                pool.query(getArticlesQuery, (error, articles) => {
                    if (error) {
                        console.log(error);
                        res.send("Error " + error);
                    } else {
                        res.render('pages/database.ejs', { user: req.session.user, results: results, })
                    }
                })
                client.release();

            } else {
                res.redirect('/unauthorized')
            }
        } else {
            res.redirect('/unauthorized')
        }
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }

})

router.delete('/:id', (req, res) => {
    var ID = req.params.id;
    var deleteArticleQuery = `DELETE FROM ${process.env.PG_DB_TABLE} where id ='${ID}'`;
    if (req.session.user) {
        if (req.session.user.admin) {
            pool.query(deleteArticleQuery, (error, result) => {
                if (error) {
                    console.log(err);
                    if (process.env.NODE_ENV == "production") {
                        res.redirect('/error')
                    } else {
                        res.send("Error " + err);
                    }
                } else {
                    console.log('User', ID, 'was deleted')
                    res.redirect('/');
                }
            })
        } else {
            res.redirect('/unauthorized')
        }
    } else {
        res.redirect('/unauthorized')
    }
})


module.exports = router;