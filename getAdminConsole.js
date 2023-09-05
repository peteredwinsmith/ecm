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

export default function getAdminConsole(req, res) {
  displayMessage = "";
  var currentPage = Math.ceil(req.query.page) || 1;
  var nextPage = currentPage + 1;
  // console.log("current page", currentPage);
  // console.log("next page", nextPage);
  var offset = (currentPage - 1) * itemsPerPage;
  const queryString = 'SELECT * FROM customer LIMIT ? OFFSET ?';
  con.query(queryString, [itemsPerPage, offset], (err, rows) => {
    if (err) throw err;

  // Count total customers to calculate number of pages
  con.query('SELECT COUNT(*) AS total FROM customer', (err, result) => {
    if (err) throw err;

  const totalCustomers = result[0].total;
  // console.log("Total Cust", totalCustomers);
  var totalPages = Math.ceil(totalCustomers / itemsPerPage);
  // console.log("Total Pages", totalPages);
  res.render("adminConsole.ejs", {
    rows, dictionary, langCode, firstName, displayMessage, currentPage, nextPage, totalPages
  });
  });
  });
  return "getAdminConsole OK";
}