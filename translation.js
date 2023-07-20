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

const x = 5;
let testValue = pkg.calcTest2(x);
console.log(testValue);

import ejs from 'ejs';

// Import JSON file and parse it
import Fs from '@supercharge/fs'
const myObj = await Fs.readJson('translation.json')
console.log(myObj);

// const myJSON = '{"en":{"login": "Login", "companyId": "Company ID", "button": "Click here"},"fr":{"login": "Connexion", "companyId": "Identifiant de lentreprise", "button": "Cliquez ici"}}';
// var myObj = JSON.parse(myJSON);
// var myObj = data;
// let lang = "fr";

var username = "mbaker";
var langId = "";
var langCode = "";

var sql = 'SELECT language_id FROM user WHERE username = ' + mysql.escape(username);
console.log(sql);
con.query(sql, function (err, result) {
  if (err) throw err;
// console.log(result);
langId = result[0].language_id;
console.log(langId);
var sql = 'SELECT code FROM language WHERE id = ' + mysql.escape(langId);
console.log(sql);
con.query(sql, function (err, result) {
  if (err) throw err;
// console.log(result);
langCode = result[0].code;
console.log(langCode);
const langObj = new Function('obj', `return obj.${langCode}`);
const dictionary = langObj(myObj);
console.log(dictionary);
app.get('/translation', (req, res) => {
  res.render("translation.ejs",{
        dictionary, langCode
  });
 });
});
});

 app.post('/', (req, res) => {
  // Get the form data from the request
  const formData = req.body;
  const screenId = req.body.screenId;

  // Display the form data on the console
  console.log(formData);
  console.log(screenId);
 });

const port = 3000;
app.listen(port);