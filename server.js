global.dictionary = {};
global.langCode = 0;
global.firstName = "";
global.rows = [];
global.displayMessage = "";
global.usernameInput = "";
global.newName = "";
global.newSuburb = "";
global.itemsPerPage = 7;
global.currentPage = 1;
global.nextPage = 2;
global.offset = (currentPage - 1) * itemsPerPage;
global.totalPages = 1;
global.searchText = "";
global.fnSearch = "";
global.suSearch = "";

// Google's phone number validation service

import libphonenumber from 'google-libphonenumber';
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

// Parse number with country code and keep raw input.
const phoneNumber = phoneUtil.parseAndKeepRawInput('0493 596 935', 'AU');

// Print the phone's country code & national number
console.log(phoneNumber.getCountryCode());
console.log(phoneNumber.getNationalNumber());

// Result from isValidNumber().
console.log(phoneUtil.isValidNumber(phoneNumber));
// => true


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

import sum from './helper.js';
console.log(sum(10, 10));

import calcTest3 from './helper2.js';
console.log(calcTest3(10));

import { customerList } from './getCustomers.js';

import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import pkg from './database.cjs';
const { calcTest2, getCookie, setCookie } = pkg;

app.use(cookieParser());
// app.use(helmet());

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Server connection error')
  res.status(401).send('Server authorisation failed')
});

import ejs from 'ejs';

// Import JSON file and parse it
import Fs from '@supercharge/fs'
const myObj = await Fs.readJson('translation.json')
// console.log(myObj);

const data = [
  { num: 0.28, status: true },
  { num: 0.21, status: false },
  { num: 0.2, status: true },
  { num: 0.19, status: false },
  { num: 0.24, status: true },
  { num: 0.23, status: false },
  { num: 0.29, status: false },
  { num: 0.25, status: true },
];

const result = data.sort((a, b) => b.status - a.status || a.num - b.num);
//console.log(result);

const x = 5;
let testValue = pkg.calcTest2(x);
console.log(testValue);

function parseParam(oldParams, newParams = {}, field = '') {
  for (const key in oldParams) {
      if (oldParams[key] !== null) {
          let field3 = field.length > 0 ? field + '[' + key + ']' : key ;
          switch (typeof oldParams[key]) {
              case 'object':         
                  let object = parseParam(oldParams[key], newParams, field3);
                  newParams = Object.assign(newParams, object);  
                  break;
              case 'string':
              case 'number':                        
                  newParams[field3] = oldParams[key];
                  break;
          }
      }
  }
  return newParams;
}

app.get('/', (req, res) => {
  res.render("index.ejs")
});

app.get('/login', (req, res) => {
  res.render("login.ejs", {
    usernameInput, displayMessage
  });
});

app.get('/adminConsole', (req, res) => {
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
});

app.get('/custSearch', (req, res) => {
  var urlString = new URLSearchParams(req.url);
  //console.log(urlString);
  const searchField = urlString.get('sch');
  console.log("searchfield", searchField);
  var fnSearch = "%" + searchField + "%";
  var suSearch = "%" + searchField + "%";
  var searchText = searchField;
  //console.log("fnsearch", fnSearch);
  displayMessage = "";
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
});

app.get('/sortCustomers', (req, res) => {
  var urlString = new URLSearchParams(req.url);
  console.log(urlString);
  const sortField = urlString.get('/sortCustomers?sort');
  console.log("sortfield", sortField);
  displayMessage = "";
    
  const SQL = 'SELECT * FROM customer';
  con.query(SQL, (err, sortrows) => {
    if (err) throw err;
  // console.log("Rows", rows);

  if (sortField == "first_name") {
    var rows = sortrows.sort(function(a, b) {
      return a.first_name.localeCompare(b.first_name)
    });
  } else {
    var rows = sortrows.sort(function(a, b) {
      return a.suburb.localeCompare(b.suburb)
    });
  };

  console.log("Sortrows", rows);

  res.render("sortCustomer.ejs", {
    rows, dictionary, langCode, firstName, displayMessage
  });
  });
  });

app.get('/addcustomer', (req, res) => {
  res.render("addCustomer.ejs", {
    dictionary, langCode, firstName, displayMessage, newName, newSuburb
  });
});

// Update or edit a customer record
app.get("/edit/:id", (req, res) => {
  
  if (req.params.id == "favicon.ico") {
    var id = '1';
  } else {
    var id = req.params.id;
  };
  
  console.log("ID for edit", id)

  // Get the customer record from MySQL
  var sql = 'SELECT * FROM customer WHERE id = ' + mysql.escape(id);
  console.log("SQL for edit", sql)

  con.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error getting customer record");
    }
    // Display the customer record in HTML
    res.render("editCustomer.ejs", { rows, dictionary, langCode, firstName, displayMessage });
  });
});

// Delete a customer record
app.get("/delete/:id", (req, res) => {
  
  if (req.params.id == "favicon.ico") {
    var id = '1';
  } else {
    var id = req.params.id;
  };
  
  console.log("ID for delete", id)

  // Get the customer record from MySQL
  var sql = 'SELECT * FROM customer WHERE id = ' + mysql.escape(id);
  console.log("SQL for edit", sql)

  con.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error getting customer record");
    }
    // Display the customer record in HTML
    res.render("deleteCustomer.ejs", { rows, dictionary, langCode, firstName, displayMessage });
  });
});


app.post('/', (req, res) => {
  // Get the form data from the request
  const formData = req.body;
  const screenId = req.body.screenId;

  // Display the form data on the console
  console.log(formData);
  console.log(screenId);

    // Return an error code if company ID not entered or invalid
    // Redirect to the Login screen if Company ID valid
    const companyId = req.body.companyId;
    if (companyId == "") {
      // Return error if company ID field is empty
      res.cookie('errorCode', "0101", { expires: new Date(Date.now() + 5000), secure: false,
      httpOnly: false });
      res.cookie('compId', companyId, { expires: new Date(Date.now() + 5000), secure: false,
        httpOnly: false });
      res.render("index.ejs");
    } else {
      // con.connect(function(err) {
      //    if (err) throw err;
          var sql = 'SELECT slug FROM company WHERE slug = ' + mysql.escape(companyId);
          console.log(sql);
          con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            if (typeof result[0] == 'undefined') {
              // Return error and company ID field if record not found on Company Table
              res.cookie('errorCode', "0102", { expires: new Date(Date.now() + 5000), secure: false,
              httpOnly: false });
              res.cookie('compId', companyId, { expires: new Date(Date.now() + 5000), secure: false,
                httpOnly: false });
              res.render("index.ejs");
            }
            else if (companyId == result[0].slug) {
              // Redirect to the login page - company ID is valid
              res.cookie('errorCode', "0201", { expires: new Date(Date.now() + 5000), secure: false,
              httpOnly: false });
              displayMessage = myObj.en.msg0201;
              // console.log ("display Message", displayMessage);
              res.render("login.ejs", {
                usernameInput, displayMessage
              });
            }
          });
    };
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.pswd;

  if (username == ""||password == "") {
    // Return error if username or password field is empty
    usernameInput = username;
    displayMessage = myObj.en.msg0202;
    // console.log ("display Message", displayMessage);
    res.render("login.ejs", {
      usernameInput, displayMessage
    });
  } else {
    // Check if username & password are valid
    var sql = 'SELECT * FROM user WHERE username = ' + mysql.escape(username) + ' AND password = ' + mysql.escape(password);
    console.log(sql);
    con.query(sql, async function (err, result) {
      if (err) throw err;
      console.log(result);
      var loginInvalid = false;
      // console.log(username);
      usernameInput = username;
      if (typeof result[0] == 'undefined') {
        // Return error and username/password fields if record not found on User Table
          loginInvalid = true;
          displayMessage = myObj.en.msg0203;
          // console.log ("display Message", displayMessage);
          res.render("login.ejs", {
            usernameInput, displayMessage
          });
        } else {
          // User has logged in successfully. Display the Admin landing page
          // Set the language ID based on user's preferred language
          const langId = result[0].language_id;
          firstName = result[0].first_name;
          console.log("language ID", langId);
          var sql = 'SELECT code FROM language WHERE id = ' + mysql.escape(langId);
          console.log(sql);
        
          con.query(sql, function (err, result) {
            if (err) throw err;
            langCode = result[0].code;
            console.log(langCode);
            const langObj = new Function('obj', `return obj.${langCode}`);
            dictionary = langObj(myObj);
            // console.log(dictionary);
          });
          displayMessage = dictionary.msg0301;
          // let displayList = await customerList(res, dictionary, langCode, firstName, displayMessage);
          console.log("current page", currentPage);
          console.log("next page", nextPage);
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
      };
      });       
  }; 

});

app.post('/adminConsole', (req, res) => {
  // customer list screen
  displayMessage = dictionary.msg0401;
  res.render("addCustomer.ejs", {
    dictionary, langCode, firstName, displayMessage, newName, newSuburb
  });
});

app.post('/addcustomer', async (req, res) => {
  // add customer screen
  const firstname = req.body.firstname;
  const suburb = req.body.suburb;
  if (firstname == ""||suburb == "") {
    // Return error if first name or suburb field is empty
    displayMessage = dictionary.msg0402;
    newName = firstname;
    newSuburb = suburb;
    res.render("addCustomer.ejs", {
      dictionary, langCode, firstName, displayMessage, newName, newSuburb
    });
  } else { 
    // add customer to database
    var sql = 'INSERT INTO customer (first_name, suburb) VALUES (' + mysql.escape(firstname) + ', ' + mysql.escape(suburb) + ')';
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      con.commit();
    });
    
    displayMessage = dictionary.msg0302;
    //const displayList = await customerList(res, dictionary, langCode, firstName, displayMessage);
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
  };
});

app.post('/editCustomer', (req, res) => {
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
});

app.post('/deleteCustomer', (req, res) => {
  const recordId = req.body.recordId;
  var sql = 'DELETE FROM customer WHERE id = '  + mysql.escape(recordId) + ';' ;
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
  //con.end();
  });

  displayMessage = dictionary.msg0304;
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
});

app.post('/searchCustomer', (req, res) => {
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
});

const port = 3000;
app.listen(port);