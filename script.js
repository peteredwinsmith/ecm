function addRow() {
  var name = document.getElementById("name").value;
  var country = document.getElementById("country").value;
  var age = document.getElementById("age").value;

  var row = document.createElement("tr");
  var nameCell = document.createElement("td");
  nameCell.innerHTML = name;
  row.appendChild(nameCell);

  var countryCell = document.createElement("td");
  countryCell.innerHTML = country;
  row.appendChild(countryCell);

  var ageCell = document.createElement("td");
  ageCell.innerHTML = age;
  row.appendChild(ageCell);

  document.getElementById("tbody").appendChild(row);
}

function updateRow(no) {
  var name = document.getElementById("name_" + no).value;
  var country = document.getElementById("country_" + no).value;
  var age = document.getElementById("age_" + no).value;

  var row = document.getElementById("row_" + no);
  row.getElementsByTagName("td")[0].innerHTML = name;
  row.getElementsByTagName("td")[1].innerHTML = country;
  row.getElementsByTagName("td")[2].innerHTML = age;
}

function deleteRow(no) {
  var row = document.getElementById("row_" + no);
  row.parentNode.removeChild(row);
}

document.getElementById("add-button").onclick = addRow;
document.getElementById("update-button").onclick = updateRow;
document.getElementById("delete-button").onclick = deleteRow;