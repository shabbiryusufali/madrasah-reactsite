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
                res.json({ results: results.results })
             
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