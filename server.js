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
const companyValid = require("./companyValid");

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const x = 5;
// testValue = companyValid.test(x);
// console.log(testValue);

app.post('/', (req, res) => {
  // Get the form data from the request
  const formData = req.body;
  const screenId = req.body.screenId;

  // Display the form data on the console
  console.log(formData);
  console.log(screenId);

  if (screenId == "01-cid") {
    const companyId = req.body.companyId;
    console.log(companyId);

    if (companyId == "") {
        // Return error if company ID field is empty
        res.redirect('https://peteredwinsmith.github.io/ecm/index.html?cde='  + encodeURIComponent("0101")); 
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
                res.redirect('https://peteredwinsmith.github.io/ecm/index.html?cde='  + encodeURIComponent("0102")); 
              }
              else if (companyId == result[0].slug) {
                // Redirect to the login page - company ID is valid
                res.redirect('https://peteredwinsmith.github.io/ecm/login.html?cde='  + encodeURIComponent("0201")); 
              }
            });
          });
    }
    
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