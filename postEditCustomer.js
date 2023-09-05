import mysql from 'mysql2'

import url from 'url'
const URLSearchParams = url.URLSearchParams;

import dotenv from 'dotenv'
dotenv.config();

var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  insecureAuth: false
});

// Import JSON file and parse it
import Fs from '@supercharge/fs'
const myObj = await Fs.readJson('translation.json')
// console.log(myObj);

export default function postEditCustomer(req, res) {
  // customer edit screen
  // update customer record in database
  const firstname = req.body.firstname;
  const suburb = req.body.suburb;
  const recordId = req.body.recordId;
  var sql = 'UPDATE customer SET first_name = ' + mysql.escape(firstname) + ', suburb = ' + mysql.escape(suburb) + ' WHERE id = '  + mysql.escape(recordId) + ';' ;
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
  //con.end();
  });

  displayMessage = dictionary.msg0303;
  const queryString = 'SELECT * FROM customer LIMIT ? OFFSET ?';
  con.query(queryString, [itemsPerPage, offset], (err, rows) => {
    if (err) throw err;
    // Count total customers to calculate number of pages
    con.query('SELECT COUNT(*) AS total FROM customer', (err, result) => {
      if (err) throw err;
        const totalCustomers = result[0].total;
        var totalPages = Math.ceil(totalCustomers / itemsPerPage);
        res.render("adminConsole.ejs", {
           rows, dictionary, langCode, firstName, displayMessage, currentPage, nextPage, totalPages
        });
    });
  });
  return "postEditCustomer OK";
}