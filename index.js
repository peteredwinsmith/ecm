var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "peteredwinsmith",
  password: "F5aZMmZ2ne9NKCFN",
  database: "bcm",
  insecureAuth: true
});

const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(express.urlencoded({ extended: false }));

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
    // const Company_Id = "";

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
                // Add the form fields to the redirect object
                // Create a redirect object
                // const redirect = {
                // url: req.headers.referer,
                // status: 302,
                // };
                // redirect.query = {
                // companyId
                // };
                res.render('https://peteredwinsmith.github.io/ecm/index.html?cde='  + encodeURIComponent("0102")); 
                // res.redirect('https://peteredwinsmith.github.io/ecm/index.html?cde='  + encodeURIComponent("0102")); 
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
  
  // Retrieve data from the Customer table and display
  // con.connect(function(err) {
  //  if (err) throw err;
  //send Customer entries back to HTML to display:
  //  var sql = "SELECT * FROM customer";
  //  con.query(sql, function (err, result) {
  //   if (err) throw err;
  //    console.log(result)
  //    res.render('text', result);
  //  });
  // });

  });

app.listen(3000);