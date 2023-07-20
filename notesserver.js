const express = require("express");
const app = express();
const database = require("./databasenotes")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.render("indexNotes.ejs", {
    numberOfItterations: 50
  })
})

app.get("/notes", (req, res) => {
  const searchTerm = req.query.searchTerm;
  const notes = databasenotes.getNotes(searchTerm);
  res.render("notes.ejs", {
    notes,
  });
})

app.get("/notes/:id", (req, res) => {
  const id = +req.params.id
  const note = databasenotes.getNote(id)
  if (!note) {
    res.status(404).render("note404.ejs")
    return
  }

  res.render("singleNote.ejs", {
    note,
  });
})

app.get("/createNote", (req, res) => {
  res.render("createNote.ejs")
})

app.post("/notes", (req, res) => {
  const data = req.body
  databasenotes.addNote(data)

  res.redirect("/notes");
})

app.post("/notes/:id/delete", (req, res) => {
  const id = +req.params.id
  databasenotes.deleteNote(id)
  res.redirect("/notes")
})

app.use(express.static("public"))


const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});