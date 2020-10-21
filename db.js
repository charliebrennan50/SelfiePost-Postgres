const  {Pool} = require("pg");
require("dotenv").config();

const devConfig = {
    user: "charlesbrennan",
    password: "Me@gh@n1$",
    host: "localhost",
    port: 5432,
    database: "selfiepost"
};

const proConfig = { connectionString:  process.env.NODE_ENV }; 

const pool = new Pool( process.env.NODE_ENV === "production" ? proConfig : devConfig);

module.exports = pool;