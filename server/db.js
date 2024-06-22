const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Ajderun007",
    host: "localhost",
    port: 5432,
    database: "mylig"
});

module.exports = pool;