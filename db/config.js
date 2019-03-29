const pgp = require('pg-promise')({}),

config = process.env.DATABASE_URL || 'postgres://Drisdon@localhost:5432/izzy_bump_db',
db = pgp(config);

module.exports = db;
