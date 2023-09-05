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

// import functions for Get & Post
import postIndex from './postIndex.js';
import postLogin from './postLogin.js';
import postAdminConsole from './postAdminConsole.js';
import postAddCustomer from './postAddCustomer.js';
import postEditCustomer from './postEditCustomer.js';
import postDeleteCustomer from './postDeleteCustomer.js';
import postSearchCustomer from './postSearchCustomer.js';
import getIndex from './getIndex.js';
import getLogin from './getLogin.js';
import getAdminConsole from './getAdminConsole.js';
import getAddCustomer from './getAddCustomer.js';
import getEditCustomer from './getEditCustomer.js';
import getDeleteCustomer from './getDeleteCustomer.js';
import getSearchCustomer from './getSearchCustomer.js';
import getSortCustomer from './getSortCustomer.js';

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
  { num: 0.21, status: false }
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

// App Get functions
app.get('/', (req, res) => {
  console.log(getIndex(req, res));
});

app.get('/login', (req, res) => {
  console.log(getLogin(req, res));
});

app.get('/adminConsole', (req, res) => {
  console.log(getAdminConsole(req, res));
});

app.get('/custSearch', (req, res) => {
  console.log(getSearchCustomer(req, res));
});

app.get('/sortCustomers', (req, res) => {
  console.log(getSortCustomer(req, res));
  });

app.get('/addcustomer', (req, res) => {
  console.log(getAddCustomer(req, res));
});

// Update or edit a customer record
app.get("/edit/:id", (req, res) => {
  console.log(getEditCustomer(req, res));
});

// Delete a customer record
app.get("/delete/:id", (req, res) => {
  console.log(getDeleteCustomer(req, res));
});

// App Post functions
app.post('/', (req, res) => {
  console.log(postIndex(req, res));
});

app.post('/login', (req, res) => {
  console.log(postLogin(req, res));
});

app.post('/adminConsole', (req, res) => {
  console.log(postAdminConsole(req, res));
});

app.post('/addcustomer', async (req, res) => {
  console.log(postAddCustomer(req, res));
});

app.post('/editCustomer', (req, res) => {
  console.log(postEditCustomer(req, res));
});

app.post('/deleteCustomer', (req, res) => {
  console.log(postDeleteCustomer(req, res));
});

app.post('/searchCustomer', (req, res) => {
  console.log(postSearchCustomer(req, res));
});

const port = 3000;
app.listen(port);