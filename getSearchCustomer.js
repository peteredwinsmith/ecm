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

export default function getSearchCustomer(req, res) {
  var urlString = new URLSearchParams(req.url);
  //console.log(urlString);
  const searchField = urlString.get('sch');
  console.log("searchfield", searchField);
  var fnSearch = "%" + searchField + "%";
  var suSearch = "%" + searchField + "%";
  var searchText = searchField;
  //console.log("fnsearch", fnSearch);
  displayMessage = dictionary.msg0305;
  var currentPage = Math.ceil(req.query.page) || 1;
  var nextPage = currentPage + 1;
  //console.log("current page", currentPage);
  // console.log("next page", nextPage);
  var offset = (currentPage - 1) * itemsPerPage;
  var searchString = 'SELECT * FROM customer where first_name like ? or suburb like ? LIMIT ? OFFSET ?';
  con.query(searchString, [fnSearch, suSearch, itemsPerPage, offset], (err, rows) => {
    if (err) throw err;

  // Count total customers to calculate number of pages
  var sql = 'SELECT COUNT(*) AS total FROM customer  where first_name like ? or suburb like ?';
  con.query(sql, [fnSearch, suSearch], (err, result) => {
    if (err) throw err;

  //console.log("rows", rows);
  const totalCustomers = result[0].total;
  // console.log("Total Cust", totalCustomers);
  var totalPages = Math.ceil(totalCustomers / itemsPerPage);
  // console.log("Total Pages", totalPages);
  res.render("custSearch.ejs", {
    rows, dictionary, langCode, firstName, displayMessage, currentPage, nextPage, totalPages, searchText
  });
  });
  });
  return "getSearchCustomer OK";
}