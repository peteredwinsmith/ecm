
function test(x) {
  const y = 10;
  const z = x * y;
  return (z);
};

console.log("Company Valid module");

var companyId = "";

function cidCheck(companyId) {
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
};
