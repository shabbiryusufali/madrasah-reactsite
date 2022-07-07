//const { ZoomMtg } = require('@zoomus/websdk');
require('dotenv').config()
const express = require("express");
const router = express.Router();
const cors = require('cors');
const pool = require('../db');

router.use(express.json(), cors());
router.options('*', cors())



router.get('/:ID', async(req, res) => {
    let id = req.params.ID;
    try {
        if (req.session.user) {
            if (req.session.user.admin) {
                const client = await pool.connect();
                const result = await client.query(`SELECT * FROM ${process.env.PG_DB_TABLE} WHERE id = ${id} ORDER BY id ASC`);
                const results = { 'results': (result) ? result.rows : null };
                res.json(results.results[0])
                client.release();
            } else {
                res.redirect('/unauthorized')
            }
        } else {
            res.redirect('/unauthorized')
        }
    } catch (err) {
        console.log(err);
        if (process.env.NODE_ENV == "production") {
            res.redirect('/error')
        } else {
            res.send("Error " + err);
        }
    }
})



module.exports = router;