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
    var nextAction = database.cidCheck(companyId);
    console.log("Server Code ", nextAction.cde);
    console.log("Server Next Screen ", nextAction.nextScreen);
    // document.cookie = "errorCode=0101; path=https://peteredwinsmith.github.io/ecm/index.html";
    res.cookie('Error Code', nextAction.cde, { expires: new Date(Date.now() + 50000), secure: false,
    httpOnly: false });
    res.redirect(302,nextAction.nextScreen + encodeURIComponent(nextAction.cde)); 
    //res.redirect(302,"/?cde=" + encodeURIComponent(nextAction.cde));

  } else {
    const username = req.body.username;
    const password = req.body.pswd;
    
    if (username == "") {
      // Return error if username field is empty
      res.redirect('https://peteredwinsmith.github.io/ecm/login.html?cde='  + encodeURIComponent("0202")); 
    } else {
      // Redirect to the login page and respond with a success message
      res.redirect('https://peteredwinsmith.github.io/ecm/adminConsole.html?cde='  + encodeURIComponent("0301")); 
    }
  }

  });

const port = 3000;
app.listen(port);