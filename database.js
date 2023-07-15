var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "peteredwinsmith",
  password: "F5aZMmZ2ne9NKCFN",
  database: "bcm",
  insecureAuth: false
});
  
  function calcTest2(x) {
    const y = 20;
    const z = x * y;
    return (z);
  };
  exports.calcTest2 = calcTest2;

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
  return "";
  }
  exports.getCookie = getCookie;

  function setCookie(cname,cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + 5000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  exports.setCookie = setCookie;

  function cidCheck(companyId) {
    console.log(companyId);
    if (companyId == "") {
        // Return error if company ID field is empty
        var cde = "0101";
        var nextScreen = "https://peteredwinsmith.github.io/ecm/index.html?cde=";
        console.log("Function Code", cde);
        console.log("Function Next Screen", nextScreen);
        // return{cde,nextScreen};
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
                var cde = "0102";
                var nextScreen = "https://peteredwinsmith.github.io/ecm/index.html?cde=";
                console.log("Function Code", cde);
                console.log("Function Next Screen", nextScreen);
                // return{cde,nextScreen};
              }
              else if (companyId == result[0].slug) {
                // Redirect to the login page - company ID is valid
                var cde = "0201";
                var nextScreen = "https://peteredwinsmith.github.io/ecm/login.html?cde=";
                console.log("Function Code", cde);
                console.log("Function Next Screen", nextScreen);
                // return{cde,nextScreen};
              }
            });
          });
          
    }
    console.log("Function Code", cde);
    console.log("Function Next Screen", nextScreen);
    return{cde,nextScreen};
  };
  exports.cidCheck = cidCheck;