var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const session = require('express-session');
const pool = require('./db');
const randomstring = require("randomstring");
const articleRouter = require('./routes/blog')
const databaseRouter = require('./routes/database')
const viewUserRouter = require('./routes/viewUser')
const libraryRouter = require('./routes/library')
const nodemailer = require('nodemailer');
var cors = require('cors');
const crypto = require('crypto');


const app = express();


//session implementation
app.use(session({

    name: "session",
    secret: 'muffin',
    resave: false,
    cookie: { maxAge: 30 * 60 * 1000 }, //60000= 1 min
    saveUninitialized: false //false prevent new cookie every http requesr

}));

app.use(cors())


//unknown functionality --> security -->>relaxes secirtuy need research?
//“CORS” stands for Cross-Origin Resource Sharing. It allows you to make requests from one website to another website in the browser, which is normally prohibited by another browser policy called the Same-Origin Policy (SOP)
//why can my test run without cors on local because same orgin if im testing serve then not 
app.use(cors())


//nesccary for req.body seriliization, big time waste to troubleshoot
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//adddeed slash to fix
app.use(express.static(path.join(__dirname, '/public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/getFooterArticles', (req, res) => {
    let getFooterArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 6`;
    pool.query(getFooterArticlesQuery, (error, articles) => {
        if (error) {
            console.log(error);
            res.send("Error " + error);
        } else {
            res.json({ articles: articles.rows })
        }
    })

})



app.post('/verifyUser/:ID', (req, res) => {
    try {
        if (req.session.user) {
            if (req.session.user.admin) {
                var idToVerify = req.params.ID;
                var verifyQuery = `UPDATE ${process.env.PG_DB_TABLE} SET verified = true WHERE id=${idToVerify};`;
                pool.query(verifyQuery);
                res.redirect(`/database/${idToVerify}`);
            } else {
                res.redirect(`/unauthorized`);
            }
        } else {
            res.redirect(`/unauthorized`);
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


app.post('/revokeVerify/:ID', (req, res) => {
    try {
        if (req.session.user) {
            if (req.session.user.admin) {
                var idToVerify = req.params.ID;
                var verifyQuery = `UPDATE ${process.env.PG_DB_TABLE} SET verified = false WHERE id=${idToVerify};`;
                pool.query(verifyQuery);
                res.redirect(`/database/${idToVerify}`);
            } else {
                res.redirect(`/unauthorized`);
            }
        } else {
            res.redirect(`/unauthorized`);
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
app.post('/adminUser/:ID', (req, res) => {
    try {
        if (req.session.user) {
            if (req.session.user.admin) {
                var idToAdmin = req.params.ID;
                var adminQuery = `UPDATE ${process.env.PG_DB_TABLE} SET admin = true, verified = true WHERE id=${idToAdmin};`;
                pool.query(adminQuery);
                res.redirect(`/database/${idToAdmin}`);
            } else {
                res.redirect(`/unauthorized`);
            }
        } else {
            res.redirect(`/unauthorized`);
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
app.post('/librarianUser/:ID', (req, res) => {
    try {
        if (req.session.user) {
            if (req.session.user.admin) {
                var idToAlter = req.params.ID;
                var librarianQuery = `UPDATE ${process.env.PG_DB_TABLE} SET librarian = true WHERE id=${idToAlter};`;
                pool.query(librarianQuery);
                res.redirect(`/database/${idToAlter}`);
            } else {
                res.redirect(`/unauthorized`);
            }
        } else {
            res.redirect(`/unauthorized`);
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
app.post('/delibrarianUser/:ID', (req, res) => {
    try {
        if (req.session.user) {
            if (req.session.user.admin) {
                var idToAlter = req.params.ID;
                var delibrarianQuery = `UPDATE ${process.env.PG_DB_TABLE} SET librarian = false WHERE id=${idToAlter};`;
                pool.query(delibrarianQuery);
                res.redirect(`/database/${idToAlter}`);
            } else {
                res.redirect(`/unauthorized`);
            }
        } else {
            res.redirect(`/unauthorized`);
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
app.post('/teacherUser/:ID', (req, res) => {
    try {
        if (req.session.user) {
            if (req.session.user.admin) {
                var idToAlter = req.params.ID;
                var alterQuery = `UPDATE ${process.env.PG_DB_TABLE} SET teacher = true WHERE id=${idToAlter};`;
                pool.query(alterQuery);
                res.redirect(`/database/${idToAlter}`);
            } else {
                res.redirect(`/unauthorized`);
            }
        } else {
            res.redirect(`/unauthorized`);
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
app.post('/unteacherUser/:ID', (req, res) => {
    try {
        if (req.session.user) {
            if (req.session.user.admin) {
                var idToAlter = req.params.ID;
                var alterQuery = `UPDATE ${process.env.PG_DB_TABLE} SET teacher = false WHERE id=${idToAlter};`;
                pool.query(alterQuery);
                res.redirect(`/database/${idToAlter}`);
            } else {
                res.redirect(`/unauthorized`);
            }
        } else {
            res.redirect(`/unauthorized`);
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


app.post('/studentUser/:ID', (req, res) => {
    try {
        if (req.session.user) {
            if (req.session.user.admin) {
                var idToAlter = req.params.ID;
                var alterQuery = `UPDATE ${process.env.PG_DB_TABLE} SET student = true WHERE id=${idToAlter};`;
                pool.query(alterQuery);
                res.redirect(`/database/${idToAlter}`);
            } else {
                res.redirect(`/unauthorized`);
            }
        } else {
            res.redirect(`/unauthorized`);
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
app.post('/unstudentUser/:ID', (req, res) => {
    try {
        if (req.session.user) {
            if (req.session.user.admin) {
                var idToAlter = req.params.ID;
                var alterQuery = `UPDATE ${process.env.PG_DB_TABLE} SET student = false WHERE id=${idToAlter};`;
                pool.query(alterQuery);
                res.redirect(`/database/${idToAlter}`);
            } else {
                res.redirect(`/unauthorized`);
            }
        } else {
            res.redirect(`/unauthorized`);
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



app.post('/alumnUser/:ID', (req, res) => {
    try {
        if (req.session.user) {
            if (req.session.user.admin) {
                var idToAlter = req.params.ID;
                var alterQuery = `UPDATE ${process.env.PG_DB_TABLE} SET alumn = true WHERE id=${idToAlter};`;
                pool.query(alterQuery);
                res.redirect(`/database/${idToAlter}`);
            } else {
                res.redirect(`/unauthorized`);
            }
        } else {
            res.redirect(`/unauthorized`);
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
app.post('/unalumnUser/:ID', (req, res) => {
    try {
        if (req.session.user) {
            if (req.session.user.admin) {
                var idToAlter = req.params.ID;
                var alterQuery = `UPDATE ${process.env.PG_DB_TABLE} SET alumn = false WHERE id=${idToAlter};`;
                pool.query(alterQuery);
                res.redirect(`/database/${idToAlter}`);
            } else {
                res.redirect(`/unauthorized`);
            }
        } else {
            res.redirect(`/unauthorized`);
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



app.post('/resetPassword/:ID', (req, res) => {
    try {
        if (req.session.user) {
            if (req.session.user.admin) {
                var idToChange = req.params.ID;
                var salt = crypto.randomBytes(16).toString('hex')
                var hashedPassword = crypto.createHash('sha256').update(`test${salt}`).digest('hex')
                var saltedPassword = `${salt}:${hashedPassword}`
                console.log(saltedPassword)
                var passChangeQuery = `UPDATE ${process.env.PG_DB_TABLE} SET pass = '${saltedPassword}' WHERE id=${idToChange};`;
                pool.query(passChangeQuery);
                res.redirect(`/database/${idToChange}`);
            } else {
                res.redirect(`/unauthorized`);
            }
        } else {
            res.redirect(`/unauthorized`);
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
app.post('/changeFirstName', (req, res) => {
    try {
        let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
        pool.query(getArticlesQuery, (error, articles) => {
            if (error) {
                console.log(error);
                res.send("Error " + error);
            } else {
                var idToChange = req.session.user.id;
                var fname = req.body.fname;
                var fname2 = req.body.fname2;
                var changeQuery = `UPDATE ${process.env.PG_DB_TABLE} SET fname = '${fname}' WHERE id=${idToChange};`;
                console.log(req.session.user.fname);
                console.log(fname);
                if (fname == fname2) {
                    pool.query(changeQuery);
                    req.session.user.fname = fname;
                    res.redirect(`/dashboard`);

                } else {
                    res.redirect(`/dashboard`);

                }
            }
        })

    } catch (err) {
        console.log(err);
        res.redirect('/dashboard')
    }
})
app.post('/changeLastName', (req, res) => {
    try {
        let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
        pool.query(getArticlesQuery, (error, articles) => {
            if (error) {
                console.log(error);
                res.send("Error " + error);
            } else {
                var idToChange = req.session.user.id;
                var lname = req.body.lname;
                var lname2 = req.body.lname2;
                var changeQuery = `UPDATE ${process.env.PG_DB_TABLE} SET lname = '${lname}' WHERE id=${idToChange};`;
                console.log(req.session.user.lname);
                console.log(lname);
                if (lname == lname2) {
                    pool.query(changeQuery);
                    req.session.user.lname = lname;
                    res.redirect(`/dashboard`);
                } else {
                    res.redirect(`/dashboard`);
                }
            }
        })

    } catch (err) {
        console.log(err);
        res.render('pages/dashboard.ejs', { pageTitle: "dashboard", user: req.session.user, action: "unknown" })
    }
})
app.post('/changeEmail', (req, res) => {
    try {
        var idToChange = req.session.user.id;
        var email = req.body.email;
        var email2 = req.body.email2;
        //const client = await pool.connect();
        var allUserQuery = `SELECT * FROM ${process.env.PG_DB_TABLE} ORDER BY id;`;
        const result = pool.query(allUserQuery);
        //const result = pool.query(allUserQuery);
        var results = { 'results': (result) ? result.rows : null };
        let doQuery = true;
        let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
        pool.query(getArticlesQuery, (error, articles) => {
            if (error) {
                console.log(error);
                res.send("Error " + error);
            } else {
                for (let i = 0; i < results.results.length; i++) {
                    //results.results.forEach(function(r) {
                    console.log(results.results);
                    let r = results.results[i];
                    if (r.email == email) {
                        doQuery = false;
                        break;
                    }
                }
                console.log(req.session.user.email);
                console.log(email);
                if (email == email2) {
                    if (doQuery) {
                        let random1 = randomstring.generate();
                        let random2 = randomstring.generate();
                        let random3 = randomstring.generate();
                        var changeQuery = `UPDATE ${process.env.PG_DB_TABLE} SET email = '${email}', random1 = '${random1}', random2 = '${random2}', random3 = '${random3}' WHERE id=${idToChange};`;
                        const queryAction = pool.query(changeQuery);

                        const { google } = require("googleapis");
                        const OAuth2 = google.auth.OAuth2;
                        const myOAuth2Client2 = new OAuth2(

                            process.env.GMAIL_CLIENT_ID,
                            process.env.GMAIL_CLIENT_SECRET,
                        )
                        myOAuth2Client2.setCredentials({
                            refresh_token: process.env.GMAIL_REFRESH_TOKEN
                        });
                        const mailTransporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                type: "OAuth2",
                                user: "cmpt276group3.2022@gmail.com",
                                clientId: process.env.GMAIL_CLIENT_ID,
                                clientSecret: process.env.GMAIL_CLIENT_SECRET,
                                refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                            }
                        });
                        let mailDetails = {
                            from: 'cmpt276group3.2022@gmail.com',
                            to: email,
                            subject: 'Action Required - Verify Account',
                            text: 'Please Verify your email address: ' + `https://cmpt276-project-group3.herokuapp.com/verifyAccount?one=${random1}&two=${random2}&three=${random3}`
                        }
                        mailTransporter.sendMail(mailDetails, function(err, data) {
                            if (err) {
                                console.log('Error Occured + err');
                            } else {
                                mailTransporter.close();
                                console.log('Email Sent Successfully');
                            }
                        });
                        req.session.user.email = email;
                        res.redirect(`/dashboard`);
                    } else {
                        res.redirect(`/dashboard`);
                    }

                } else {
                    res.redirect(`/dashboard`);

                }
            }
        })
    } catch (err) {
        console.log(err);
        res.render('pages/dashboard.ejs', { pageTitle: "dashboard", user: req.session.user, action: "unknown", footerArticles: articles.rows })
    }
})

app.post('/changePassword', (req, res) => {
    try {
        let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
        pool.query(getArticlesQuery, (error, articles) => {
            if (error) {
                console.log(error);
                res.send("Error " + error);
            } else {
                var idToChange = req.session.user.id;
                var oldPass = req.body.oldpass;
                
                var passwordSplit = req.session.user.pass.split(':')
                var salt = passwordSplit[0]
                var passwordToCheck = crypto.createHash('sha256').update(`${oldPass}${salt}`).digest('hex')

                var newPass = req.body.pass;
                var newPass2 = req.body.passv2;

                
                
                var newPassHashed = crypto.createHash('sha256').update`${newPass}${salt}`
                var newPassToStore = `${salt}:${newPassHashed}`

                var changePassQuery = `UPDATE ${process.env.PG_DB_TABLE} SET pass = '${newPassToStore}' WHERE id=${idToChange};`;
                console.log(req.session.user.pass);
                console.log(oldPass);
                if (passwordSplit[1] == passwordToCheck) {
                    if (newPass == newPass2) {

                        pool.query(changePassQuery);
                        res.redirect(`/dashboard`);
                    } else {
                        res.redirect(`/dashboard`);
                    }
                } else {
                    res.redirect(`/dashboard`);
                }
            }
        })

    } catch (err) {
        console.log(err);
        res.redirect(`/dashboard`);
    }

})

app.post('/editMailingList', (req, res) => {
    try {
        let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
        pool.query(getArticlesQuery, (error, articles) => {
            if (error) {
                console.log(error);
                res.send("Error " + error);
            } else {
                var idToChange = req.session.user.id;
                var mailinglist = req.body.mailinglist;
                var changePassQuery = `UPDATE ${process.env.PG_DB_TABLE} SET mailinglist = ${mailinglist} WHERE id=${idToChange};`;
                console.log(req.session.user.pass);
                if (req.session.user) {
                    pool.query(changePassQuery);
                    res.redirect(`/dashboard`);

                } else {
                    res.redirect(`/dashboard`);
                }
            }
        })



    } catch (err) {
        console.log(err);
        res.redirect(`/dashboard`);
    }

})


app.post('/login_action', urlencodedParser, async(req, res) => {


    var un = req.body.uname;
    var pw = req.body.pass;
    var userPasswordQuery = `SELECT * FROM ${process.env.PG_DB_TABLE} WHERE LOWER(user_name)=LOWER('${un}')`;

    try {
        const client = await pool.connect();
        const result = await client.query(userPasswordQuery);
        const results = { 'row': (result) ? result.rows : null };
        var passwordSplit = results.row[0].pass.split(':')
        var salt = passwordSplit[0]
        var passwordToCheck = crypto.createHash('sha256').update(`${pw}${salt}`).digest('hex')
        console.log("input: " + passwordToCheck)
        console.log("database: " + passwordSplit[1])


        if (passwordToCheck == passwordSplit[1]) {
            console.log("match")
        }
        if (passwordToCheck == passwordSplit[1]) {
            req.session.user = results.row[0];
            console.log(req.session.user)
            console.log(req.sessionID)
            res.redirect("/dashboard")
        } else {
            res.redirect("/login/incorrect")
        }
        client.release();
    } catch (err) {
        console.error(err);
        res.redirect("/login/erroroccured")
    }
})

app.post('/signup_action', urlencodedParser, async(req, res) => {

    let id = req.body.id
    let un = req.body.uname;
    let pw = req.body.pass;
    let pwv2 = req.body.passv2;
    let email = req.body.email;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let mailinglist = req.body.mailinglist;
    console.log(mailinglist)



    try {
        if (pw == pwv2) {
            const client = await pool.connect();
            var allUserQuery = `SELECT * FROM ${process.env.PG_DB_TABLE} ORDER BY id;`;
            const result = await client.query(allUserQuery);
            var results = { 'results': (result) ? result.rows : null };
            var userPasswordQuery = `SELECT * FROM ${process.env.PG_DB_TABLE} WHERE user_name='${un}';`;



                var salt = crypto.randomBytes(16).toString('hex');
                var hash = crypto.createHash('sha256').update(`${pw}${salt}`).digest('hex');
                var passwordToStore = `${salt}:${hash}`
                console.log(passwordToStore);


                let random1 = randomstring.generate();
                let random2 = randomstring.generate();
                let random3 = randomstring.generate();
                var insertQuery = `INSERT INTO ${process.env.PG_DB_TABLE} VALUES (${id},'${un}','${passwordToStore}','${email}',false, false, '${fname}','${lname}', '${random1}', '${random2}', '${random3}', ${mailinglist}, false, false, false, false);`;
                const insert = await client.query(insertQuery);
                const result2 = await client.query(userPasswordQuery);
                var results2 = { 'results': (result2) ? result2.rows : null };
                console.log(results2)
                req.session.user = results2.results[0];

                const { google } = require("googleapis");
                const OAuth2 = google.auth.OAuth2;
                const myOAuth2Client2 = new OAuth2(


                    process.env.GMAIL_CLIENT_ID,
                    process.env.GMAIL_CLIENT_SECRET,
                )
                myOAuth2Client2.setCredentials({
                    refresh_token: process.env.GMAIL_REFRESH_TOKEN
                });

                const mailTransporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: "OAuth2",
                        user: "cmpt276group3.2022@gmail.com",
                        clientId: process.env.GMAIL_CLIENT_ID,
                        clientSecret: process.env.GMAIL_CLIENT_SECRET,
                        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                    }
                });
                let mailDetails = {
                    from: 'cmpt276group3.2022@gmail.com',
                    to: email,
                    subject: 'Action Required - Verify Account',
                    text: 'Please Verify your email address: ' + `https://madrasah-reactsite.herokuapp.com/verifyAccount?one=${random1}&two=${random2}&three=${random3}`
                }
                mailTransporter.sendMail(mailDetails, function(err, data) {
                    if (err) {
                        console.log('Error Occured + err');
                    } else {
                        mailTransporter.close();
                        console.log('Email Sent Successfully');
                    }
                });
                res.redirect("/dashboard/success")
            
            client.release();
        } else {
                    res.redirect('/signup/unmatchpassword')
        }
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})
app.get('/verifyAccount', async(req, res) => {

    try {
        const client = await pool.connect();
        var random1 = req.query.one;
        var random2 = req.query.two;
        var random3 = req.query.three;
        var searchQuery = `SELECT * FROM ${process.env.PG_DB_TABLE} WHERE random1 = '${random1}'`
        var verifyQuery = `UPDATE ${process.env.PG_DB_TABLE} SET verified = true WHERE random1 = '${random1}'`
        const result = await client.query(searchQuery);
        const results = { 'results': (result) ? result.rows : null };
        var check1 = false;
        var check2 = false;
        var check3 = false;
        if (random1 == results.results[0].random1) {
            console.log('Check 1 Complete');
            check1 = true;
        }
        if (random2 == results.results[0].random2) {
            console.log('Check 2 Complete');
            check2 = true;
        }
        if (random3 == results.results[0].random3) {
            console.log('Check 3 Complete');
            check3 = true;
        }
        if (check1 && check2 && check3) {
            await client.query(verifyQuery)
            if (req.session.user) {
                res.redirect(`/dashboard`);
            } else {
                let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
                pool.query(getArticlesQuery, (error, articles) => {
                    if (error) {
                        console.log(error);
                        res.send("Error " + error);
                    } else {
                        res.redirect('/dashboard')
                    }
                })
            }
        } else {

            if (req.session.user) {
                let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
                pool.query(getArticlesQuery, (error, articles) => {
                    if (error) {
                        console.log(error);
                        res.send("Error " + error);
                    } else {
                        res.redirect('/dashboard')
                    }
                })
            } else {
                let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
                pool.query(getArticlesQuery, (error, articles) => {
                    if (error) {
                        console.log(error);
                        res.send("Error " + error);
                    } else {

                        res.redirect('/dashboard')
                    }
                })
            }
        }
    } catch (err) {
        console.log(err)
        res.redirect('/dashboard')
    }
})

app.get('/getActiveUser', (req, res) => {
    if (req.session.user) {
        var currentUser = req.session.user;
        delete currentUser.pass 

        res.json(currentUser)
    } else {
        res.json(null)
    }
})


app.get('/logoutAction', async(req, res) => {
    let getArticlesQuery = `SELECT * FROM ${process.env.PG_BLOG_TABLE} ORDER BY date DESC LIMIT 5`;
    pool.query(getArticlesQuery, (error, articles) => {
        if (error) {
            console.log(error);
            res.send("Error " + error);
        } else {
            if (req.session.user) {

                req.session.destroy(err => {
                    if (err) {
                        res.status(400).send('Unable to log out')
                    } else {
                        res.redirect('/logout')
                    }
                });

            } else {
                res.redirect('/logout/loggedout')
            }
        }
    })
})



app.use('/articleFunctions', articleRouter)
app.use('/databaseFunctions', databaseRouter)
app.use('/libraryFunctions', libraryRouter)
app.use('/viewUser', viewUserRouter)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//this was neccasry for mocha to get server adreess
module.exports = app;


app.listen(PORT, () => {
    const createQuery1 = `CREATE TABLE IF NOT EXISTS ${process.env.PG_DB_TABLE} (
         id BIGINT NOT NULL,
         user_name TEXT NOT NULL, 
         pass TEXT NOT NULL, 
         email TEXT NOT NULL, 
         admin BOOLEAN NOT NULL DEFAULT false, 
         verified BOOLEAN NOT NULL DEFAULT false, 
         fname TEXT NOT NULL, 
         lname TEXT NOT NULL, 
         random1 TEXT,
         random2 TEXT,
         random3 TEXT,
         mailinglist boolean NOT NULL DEFAULT false,
         teacher BOOLEAN NOT NULL DEFAULT false,
         student BOOLEAN NOT NULL DEFAULT false,
         alumn BOOLEAN NOT NULL DEFAULT false,
         librarian BOOLEAN NOT NULL DEFAULT false);`
    const createQuery2 = `CREATE TABLE IF NOT EXISTS ${process.env.PG_BLOG_TABLE} (
        id SERIAL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        markdown TEXT NOT NULL,
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        author TEXT
    )`
    const createQuery3 = `CREATE TABLE IF NOT EXISTS ${process.env.PG_LIBRARY_TABLE} (
        id BIGINT NOT NULL,
        title TEXT NOT NULL,
        gradelevel INTEGER NOT NULL,
        userloanedto TEXT,
        userloanedtoid BIGINT,
        date DATE DEFAULT CURRENT_TIMESTAMP
    )`
    pool.query(createQuery1, (err, result) => {
        if(err){
            res.send(err)
        }
    })
    pool.query(createQuery2, (err, result) => {
        if(err){
            res.send(err)
        }
    })
    pool.query(createQuery3, (err, result) => {
        if(err){
            res.send(err)
        }
    })
    console.log(`Listening on ${ PORT }`)
});