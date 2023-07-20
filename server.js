global.dictionary = {};
global.langCode = 0;
global.firstName = "";
global.rows = [];

import mysql from 'mysql2'
// var mysql = require('mysql2');

import dotenv from 'dotenv'
dotenv.config();

var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  insecureAuth: false
});

// const express = require('express');
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// var bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

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

// var database = require('./database.js');
import ejs from 'ejs';
// const { closeDelimiter } = ejs;
// const { closeDelimiter } = require('ejs');

// Import JSON file and parse it
import Fs from '@supercharge/fs'
const myObj = await Fs.readJson('translation.json')
console.log(myObj);

const x = 5;
// let testValue = database.calcTest2(x);
let testValue = pkg.calcTest2(x);
console.log(testValue);

app.get('/', (req, res) => {
  res.render("index.ejs")
});

app.get('/login', (req, res) => {
  res.render("login.ejs")
});

app.get('/admin', (req, res) => {
  res.render("adminConsole.ejs"), {
    rows
 };
});

app.get('/customer', (req, res) => {
  res.render("customerCreate.ejs")
});

app.post('/', (req, res) => {
  // Get the form data from the request
  const formData = req.body;
  const screenId = req.body.screenId;

  // Display the form data on the console
  console.log(formData);
  console.log(screenId);

  if (screenId == "01-cid") {
    // Return an error code if company ID not entered or invalid
    // Redirect to the Login screen if Company ID valid
    const companyId = req.body.companyId;
    if (companyId == "") {
      // Return error if company ID field is empty
      res.cookie('errorCode', "0101", { expires: new Date(Date.now() + 5000), secure: false,
      httpOnly: false });
      res.cookie('compId', companyId, { expires: new Date(Date.now() + 5000), secure: false,
        httpOnly: false });
      res.redirect(302,"/");
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
              res.redirect(302,"/");
            }
            else if (companyId == result[0].slug) {
              // Redirect to the login page - company ID is valid
              res.cookie('errorCode', "0201", { expires: new Date(Date.now() + 5000), secure: false,
              httpOnly: false });
              res.redirect(302,"/login");
            }
          });
      // });
    }
  } else if (screenId == "02-log") {
    const username = req.body.username;
    const password = req.body.pswd;
  
    if (username == ""||password == "") {
      // Return error if username or password field is empty
      res.cookie('errorCode', "0202", { expires: new Date(Date.now() + 5000), secure: false,
      httpOnly: false });
      res.cookie('username', username, { expires: new Date(Date.now() + 5000), secure: false,
      httpOnly: false });
      res.cookie('password', password, { expires: new Date(Date.now() + 5000), secure: false,
      httpOnly: false });
      res.redirect(302,"/login");
    } else {
      // Check if username & password are valid
      var sql = 'SELECT * FROM user WHERE username = ' + mysql.escape(username) + ' AND password = ' + mysql.escape(password);
      console.log(sql);
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        var loginInvalid = false;
        if (typeof result[0] == 'undefined') {
          // Return error and username/password fields if record not found on User Table
            loginInvalid = true;
            res.cookie('errorCode', "0203", { expires: new Date(Date.now() + 5000), secure: false,
            httpOnly: false });
            res.cookie('username', username, { expires: new Date(Date.now() + 5000), secure: false,
            httpOnly: false });
            res.cookie('password', password, { expires: new Date(Date.now() + 5000), secure: false,
            httpOnly: false });
            res.redirect(302,"/login");
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
              // console.log(result);
              langCode = result[0].code;
              console.log(langCode);
              const langObj = new Function('obj', `return obj.${langCode}`);
              dictionary = langObj(myObj);
              console.log(dictionary);
            });
            res.cookie('errorCode', "0301", { expires: new Date(Date.now() + 5000), secure: false,
            httpOnly: false });
            var sql = 'SELECT * FROM customer';
            console.log(sql);
            console.log("username", username);
            con.query(sql, (err, rows, fields) => {
            if (err) throw err;
            console.log(rows);
            res.render("adminConsole", {
               rows, dictionary, langCode, firstName
            });
            });
          };
        });       
    }; 
  } else if (screenId == "03-adc") {
    res.cookie('errorCode', "0401", { expires: new Date(Date.now() + 5000), secure: false,
      httpOnly: false });
    res.redirect(302,"/customer");
  // customer create screen
  } else if (screenId == "04-cuc") {
    const firstname = req.body.firstname;
    const suburb = req.body.suburb;
    if (firstname == ""||suburb == "") {
      // Return error if first name or suburb field is empty
      res.cookie('errorCode', "0402", { expires: new Date(Date.now() + 5000), secure: false,
      httpOnly: false });
      res.cookie('firstname', firstname, { expires: new Date(Date.now() + 5000), secure: false,
      httpOnly: false });
      res.cookie('suburb', suburb, { expires: new Date(Date.now() + 5000), secure: false,
      httpOnly: false });
      res.redirect(302,"/customer");
    } else { 
      // add customer to database
      sql = 'INSERT INTO customer (first_name, suburb) VALUES (' + mysql.escape(firstname) + ', ' + mysql.escape(suburb) + ')';
      console.log(sql);
      con.query(sql, function (err, result) {
        if (err) throw err;
      });
      console.log("Dictionary", dictionary);
      console.log("langCode", langCode);
      console.log("firstName", firstName);
      var sql = 'SELECT * FROM customer';
      con.query(sql, (err, rows, fields) => {
        if (err) throw err;
        console.log(rows);
        res.cookie('errorCode', "0403", { expires: new Date(Date.now() + 5000), secure: false,
        httpOnly: false });
        res.render("adminConsole", {
        rows, dictionary, langCode, firstName
        });
      });
    };
  };
});

const port = 3000;
app.listen(port);