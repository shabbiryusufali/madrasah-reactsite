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
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${process.env.PG_DB_TABLE} WHERE id = ${id} ORDER BY id ASC`);
        const results = { 'results': (result) ? result.rows : null };
        res.json(results.results[0])
        client.release();

    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})



module.exports = router;