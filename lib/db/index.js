'use strict';
const {Pool} = require('pg');

//const serviceHost = process.env.MY_DATABASE_SERVICE_HOST || 'localhost';
const serviceHost = process.env.MY_DATABASE_SERVICE_HOST || '172.30.152.17';
const user = process.env.DB_USERNAME || 'user';
const password = process.env.DB_PASSWORD || 'password';
const connectionString = `postgresql://${user}:${password}@${serviceHost}:5432/my_data`;
console.log("user=",user);
console.log("password=",password);
console.log("connectionString=",connectionString);

const pool = new Pool({
  connectionString
});

// -- Create the products table if not present
const initScript = `CREATE TABLE IF NOT EXISTS products (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(40) NOT NULL,
  stock     BIGINT
);

DELETE FROM products;

INSERT INTO products (name, stock) values ('Apple', 10);
INSERT INTO products (name, stock) values ('Orange', 10);
INSERT INTO products (name, stock) values ('Pear', 10);`;

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
  init: () => {
    return pool.query(initScript);
  }
};
