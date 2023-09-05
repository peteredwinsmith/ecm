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

export default function postSearchCustomer(req, res) {
  // customer list search results
  var searchText = req.body.searchText;
  console.log("Search Text", searchText);
  // If search is blank return to full customer list
  if (searchText == "") {
    var currentPage = 1;
    var nextPage = currentPage + 1;
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
  } else {
    // example of filtering a javascript object
    // let filteredCustomers = rows.filter((customer) => {
    //    return customer.first_name.toLowerCase().includes(searchText.toLowerCase()) || customer.suburb.toLowerCase().includes(searchText.toLowerCase());
    //  });
    // console.log("Filtered list", filteredCustomers);
    //  rows = filteredCustomers;
    var fnSearch = "%" + searchText + "%";
    var suSearch = "%" + searchText + "%";
    console.log("fnsearch", fnSearch);
    console.log("susearch", suSearch);
    displayMessage = dictionary.msg0305;
    // Display partial customer list based on search criteria with navigation menu
    var currentPage = 1;
    var nextPage = currentPage + 1;
    const queryString = 'SELECT * FROM customer where first_name like ? or suburb like ? LIMIT ? OFFSET ?';
    con.query(queryString, [fnSearch, suSearch, itemsPerPage, offset], (err, rows) => {
    if (err) throw err;

    // Count total customers to calculate number of pages
    var sql = 'SELECT COUNT(*) AS total FROM customer  where first_name like ? or suburb like ?';
    con.query(sql, [fnSearch, suSearch], (err, result) => {
      if (err) throw err;
      const totalCustomers = result[0].total;
      var totalPages = Math.ceil(totalCustomers / itemsPerPage);
      res.render("custSearch.ejs", {
       rows, dictionary, langCode, firstName, displayMessage, currentPage, nextPage, totalPages, searchText
      });
    });
  });
  }
  return "postSearchCustomer OK";
}