const Pool = require("pg").Pool;


//hide sensitive info
require("dotenv").config();


//will need to determin production or dev env
const devConfig = {

    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database:process.env.PG_DATABASE,
    port: process.env.PG_PORT

}

const proConfig ={


    connectionString: process.env.DATABASE_URL, 
    ssl: { rejectUnauthorized: false }

}

//production use heroku env else use local
const pool=new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = pool;