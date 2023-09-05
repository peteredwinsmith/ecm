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

export default function postLogin(req, res) {
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
  return "postLogin OK";
}