var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "peteredwinsmith",
  password: "F5aZMmZ2ne9NKCFN",
  database: "bcm",
  insecureAuth: true
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM customer", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    let text = "";
    for (let x in result) {
       text = result[x].name;
       if (text == "Pam") {
         console.log(result[x].address); 
       } else if (text == "Max") {
         //  block of code to be executed if the condition is false
       } else {
         //  block of code to be executed if the condition is false
       }
    }
  });
});

con.connect(function(err) {
  if (err) throw err;
  //Update the address field:
  var sql = "UPDATE customer SET address = 'Rye' WHERE address = 'Rosebud'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});

const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(express.urlencoded({ extended: false }));

// app.use(bodyParser.json());

app.post('/', (req, res) => {
  // Get the form data from the request
  const formData = req.body;
  const username = req.body.username;
  const password = req.body.pswd;
  const email = req.body.email;

  // Print the form data to the console
  console.log(formData);
  console.log(username)
  console.log(req.headers);
  // console.log(req)

  if (username == "") {
    // Return error if username field is empty
    res.redirect('https://peteredwinsmith.github.io/ecm/login.html?cde='  + encodeURIComponent("0201")); 
  } else {
    // Redirect to the login page and respond with a success message
    res.redirect('https://peteredwinsmith.github.io/ecm/login.html?cde='  + encodeURIComponent("Login Successful!")); 
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