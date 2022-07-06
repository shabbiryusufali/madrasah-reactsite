const express = require('express')
const router = express.Router()
const pool = require('../db');
const methodOverride = require('method-override');
router.use(methodOverride('_method'))

// home page where all the articles are displayed
router.get('/', (req, res) => {
    if (req.session.user === undefined) {
        req.session.user = null;
    }

    let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC`;
    pool.query(getArticlesQuery, (error, result) => {
        if (error) {
            console.log(error);
            res.send("Error " + error);
        } else {
            res.json({ array: result.rows })
        }
    })
})

// page to create a new article
router.get('/new', (req, res) => {
    if (req.session.user === undefined) {
        req.session.user = null;
    }
    let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 3`;
    pool.query(getArticlesQuery, (error, articles) => {
        if (error) {
            console.log(error);
            res.send("Error " + error);
        } else {
            let article = {
                "title": "",
                "description": "",
                "markdown": "",
            }
            if (req.session.user && req.session.user.admin) {
                res.render('pages/articles/new.ejs', { pageTitle: "newarticle", user: req.session.user, article: article, footerArticles: articles.rows })
            } else {
                res.render('pages/unauthorized.ejs', { pageTitle: "unauthorized", user: req.session.user, article: article, footerArticles: articles.rows })
            }
        }
    })
})

// page to edit an article
router.get('/edit/:id', (req, res) => {
    if (req.session.user === undefined) {
        req.session.user = null;
    }
    let getFooterArticleQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 3`;
    pool.query(getFooterArticleQuery, (error, articles) => {
        if (error) {
            console.log(error);
            res.send("Error " + error);
        } else {
            var ID = req.params.id;
            var getArticleQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} where id ='${ID}'`;
            pool.query(getArticleQuery, (error, result) => {
                if (error) {
                    res.send(error);
                } else {
                    var article = result.rows[0];
                    if (article === undefined) {
                        article = null;
                    }
                    if (req.session.user && req.session.user.admin) {
                        if (article == null) {
                            res.render('pages/articles/show.ejs', { pageTitle: "articles", user: req.session.user, article: article, footerArticles: articles.rows });
                        } else {
                            res.render('pages/articles/edit.ejs', { pageTitle: "editarticle", user: req.session.user, article: article, footerArticles: articles.rows })
                        }
                    } else {
                        res.render('pages/unauthorized.ejs', { pageTitle: "unauthorized", user: req.session.user, article: article, footerArticles: articles.rows })
                    }
                }
            })
        }
    })
})

// need to check input
// adding a new article to the blog
router.post('/new', (req, res) => {
    try {
        let fname;
        let lname;
        if (req.session.user) {
            fname = req.session.user.fname;
            lname = req.session.user.lname;
        } else {
            fname = "test1";
            lname = "test2";
        }
        let title = req.body.title;
        let description = req.body.description;
        let markdown = req.body.markdown;
        markdown = markdown.replace(/\'/gi, "''")
        console.log("Markdown: " + markdown);
        let addArticleQuery = `INSERT INTO ${process.env.PG_BLOG_TABLE} (title, description, markdown, author) VALUES ('${title}', '${description}', E'${markdown}', '${fname} ${lname}')`;
        pool.query(addArticleQuery);
    } catch (err) {
        console.log(err);
    }
    res.redirect('/articles');
})

// dispaying a specific article
router.get('/:id', (req, res) => {
    if (req.session.user === undefined) {
        req.session.user = null;
    }

    var ID = req.params.id;
    var getArticleQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} where id ='${ID}'`;
    pool.query(getArticleQuery, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            var article = result.rows[0];
            if (article === undefined) {
                article = null;
            }
            res.json(article)
        }
    })

})

// deleting a specific article
router.delete('/:id', (req, res) => {
    var ID = req.params.id;
    var deleteArticleQuery = `DELETE FROM ${process.env.PG_BLOG_TABLE} where id ='${ID}'`;
    pool.query(deleteArticleQuery, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            console.log('Post', ID, 'was deleted')
            res.redirect('/');
        }
    })
})

// updating/editing a specific article
router.put('/:id', (req, res) => {
    try {
        let fname;
        let lname;
        if (req.session.user) {
            fname = req.session.user.fname;
            lname = req.session.user.lname;
        } else {
            fname = "test1 update";
            lname = "test2 update";
        }
        let ID = req.params.id;
        let title = req.body.title;
        let description = req.body.description;
        let markdown = req.body.markdown;
        let addArticleQuery = `UPDATE ${process.env.PG_BLOG_TABLE} SET title='${title}', description='${description}', markdown=E'${markdown}', author='${fname} ${lname}' WHERE id=${ID}`;
        pool.query(addArticleQuery);
    } catch (err) {
        console.log(err);
    }
    res.redirect('/articles');
})

module.exports = router