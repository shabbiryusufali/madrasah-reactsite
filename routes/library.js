require('dotenv').config()
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const express = require("express");
const router = express.Router();
const cors = require('cors');
const pool = require('../db');
const methodOverride = require('method-override');
router.use(methodOverride('_method'))
router.use(express.json(), cors());
router.options('*', cors())
    //middle ware
router.use((req, res, next) => {
    next()
})


router.post('/addBook', urlencodedParser, async(req, res) => {
    try {
        var bookID = req.body.newBookID;
        var bookTitle = req.body.newBookTitle;
        var bookGrade = req.body.newBookGrade;
        let insertQuery = `INSERT INTO ${process.env.PG_LIBRARY_TABLE}(id,title,gradelevel) VALUES (${bookID}, '${bookTitle}', ${bookGrade});`;

        const client = await pool.connect();
        const result = await client.query(insertQuery);
        results = { 'results': (result) ? result.rows : null };

        res.redirect('/library');


        client.release();

    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})

router.post('/returnBook', urlencodedParser, async(req, res) => {
    try {
        var bookID = req.body.bookToReturnID;
        let returnQuery = `UPDATE library SET userloanedto = NULL, userloanedtoid = NULL WHERE id = ${bookID}`;

        const client = await pool.connect();
        const result = await client.query(returnQuery);
        results = { 'results': (result) ? result.rows : null };
        res.redirect('/library');


        client.release();

    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})


router.post('/checkoutBook', urlencodedParser, async(req, res) => {
    try {
        var bookID = req.body.bookID;
        var studentID = req.body.studentID;
        console.log('Got Body')
        let bookQuery = `SELECT * FROM library WHERE id = ${bookID};`;
        let studentQuery = `SELECT * FROM user_test1 WHERE id = ${studentID};`;

        const client = await pool.connect();
        const result = await client.query(bookQuery);
        results = { 'results': (result) ? result.rows : null };
        console.log(results)
        console.log('Step 1 done!');
        if (results.results[0]) {
            console.log("Step 2 start...")
            const result1 = await client.query(studentQuery);
            results1 = { 'results': (result1) ? result1.rows : null };
            console.log('Step 2 done!');
            console.log(results1)
            if (results1.results[0]) {
                let checkoutToStudent = `UPDATE library SET userloanedto = '${results1.results[0].fname} ${results1.results[0].lname}', userloanedtoid = ${studentID}, date = CURRENT_TIMESTAMP WHERE id = ${bookID};`;
                const result2 = await client.query(checkoutToStudent);
                results2 = { 'results': (result2) ? result2.rows : null };
                console.log('Step 3 done!');

            }
        }
        res.redirect('/library');


        client.release();

    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})

router.get('/books', (req, res) => {
    if (req.session.user === undefined) {
        req.session.user = null;
    }

    let getBooksQuery = `SELECT * FROM ${process.env.PG_LIBRARY_TABLE} ORDER BY id DESC`;
    pool.query(getBooksQuery, (error, result) => {
        if (error) {
            console.log(error);
            res.send("Error " + error);
        } else {
            res.json({ array: result.rows })
        }
    })
})

router.get('/borrowedBooks', (req, res) => {
    if (req.session.user === undefined) {
        req.session.user = null;
    }

    let getBooksQuery = `SELECT * FROM ${process.env.PG_LIBRARY_TABLE} WHERE userloanedto IS NOT NULL  ORDER BY id DESC`;
    pool.query(getBooksQuery, (error, result) => {
        if (error) {
            console.log(error);
            res.send("Error " + error);
        } else {
            res.json({ array: result.rows })
        }
    })
})

router.get('/book/:id', (req, res) => {
    if (req.session.user === undefined) {
        req.session.user = null;
    }

    var ID = req.params.id;
    var getBookQuery = `SELECT * FROM ${process.env.PG_LIBRARY_TABLE} where id ='${ID}'`;
    pool.query(getBookQuery, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            var book = result.rows[0];
            if (book === undefined) {
                book = null;
            }
            res.json(book)
        }
    })

})

module.exports = router;