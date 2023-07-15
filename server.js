var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "peteredwinsmith",
  password: "F5aZMmZ2ne9NKCFN",
  database: "bcm",
  insecureAuth: false
});

const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// app.use(helmet());

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

var database = require('./database.js');
const { closeDelimiter } = require('ejs');

const x = 5;
let testValue = database.calcTest2(x);
console.log(testValue);

app.get('/', (req, res) => {
  res.render("index.ejs")
});

app.get('/login', (req, res) => {
  res.render("login.ejs")
});

app.get('/admin', (req, res) => {
  res.render("adminConsole.ejs")
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
      // res.redirect(302,"/?cde=" + encodeURIComponent("0101"));
      res.redirect(302,"/");
    } else {
      con.connect(function(err) {
          if (err) throw err;
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
              // res.redirect(302,"/?cde=" + encodeURIComponent("0102")); 
              res.redirect(302,"/");
            }
            else if (companyId == result[0].slug) {
              // Redirect to the login page - company ID is valid
              res.cookie('errorCode', "0201", { expires: new Date(Date.now() + 5000), secure: false,
              httpOnly: false });
              res.redirect(302,"/login?cde=" + encodeURIComponent("0201"));
            }
          });
      });
    }
  } else {
    const username = req.body.username;
    const password = req.body.pswd;
  
    if (username == "") {
      // Return error if username field is empty
      res.cookie('errorCode', "0202", { expires: new Date(Date.now() + 5000), secure: false,
      httpOnly: false });
      res.redirect(302,"/login?cde=" + encodeURIComponent("0202"));
    } else {
      // Redirect to the login page and respond with a success message
      res.cookie('errorCode', "0301", { expires: new Date(Date.now() + 5000), secure: false,
      httpOnly: false });
      res.redirect(302,"/admin?cde=" + encodeURIComponent("0301"));
    }
  }

});

const port = 3000;
app.listen(port);