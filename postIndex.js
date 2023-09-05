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

export default function postIndex(req, res) {
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
    return "postIndex OK";
}