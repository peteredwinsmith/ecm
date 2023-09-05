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

export default function getSortCustomer(req, res) {
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

  // console.log("Sortrows", rows);

  res.render("sortCustomer.ejs", {
    rows, dictionary, langCode, firstName, displayMessage
  });
  });
  return "getSortCustomer OK";
}