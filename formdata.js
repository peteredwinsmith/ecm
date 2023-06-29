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

app.use(bodyParser.json());

app.post('/', (req, res) => {
  // Get the form data from the request
  const formData = req.body;

  // Print the form data to the console
  console.log(JSON.stringify(formData));
  console.log(JSON.stringify(req.headers));
  // console.log(req)

  // Respond with a success message
  req.flash('message', 'You are successfully logged in!');
  res.redirect('https://peteredwinsmith.github.io/ecm/bcm_demo_admin_console.html'); 
  // res.redirect('back'); 
  // res.send('Form data received successfully');
});

app.listen(3000);