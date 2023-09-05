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

export default function postAdminConsole(req, res) {
  // customer list screen
  displayMessage = dictionary.msg0401;
  res.render("addCustomer.ejs", {
    dictionary, langCode, firstName, displayMessage, newName, newSuburb
  });
  return "postAdminConsole OK";
}