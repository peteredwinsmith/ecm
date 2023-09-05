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

export default function getEditCustomer(req, res) {
  if (req.params.id == "favicon.ico") {
    var id = '1';
  } else {
    var id = req.params.id;
  };
  
  console.log("ID for edit", id)

  // Get the customer record from MySQL
  var sql = 'SELECT * FROM customer WHERE id = ' + mysql.escape(id);
  console.log("SQL for edit", sql)
  displayMessage = dictionary.msg0501;
  con.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error getting customer record");
    }
    // Display the customer record in HTML
    res.render("editCustomer.ejs", { rows, dictionary, langCode, firstName, displayMessage });
  });
  return "getEditCustomer OK";
}