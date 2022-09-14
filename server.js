const express = require('express');
const PORT = process.env.PORT || 3004;
const fs = require('fs');
const path = require('path');
//allows access to db data
const { notes } = require('./Develop/db/db.json');
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//middleware that instructs the server to make certian files readily available
app.use(express.static('public'));

//when we POST a new note, we'll add it to the imported db array from the db.json file
function createNewNote(body, noteArray) {
    const note = body;
    noteArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({ note: noteArray }, null, 2)
      );
    
    //return finished code to post route for response
    return note;
};

//post requests represent the action of a client requesting the server to accept data
app.post('/api/note', (req, res) => {
  //set id based on what the next index of the array will be
  req.body.id = notes.length.toString();
  // if any data in req.body is incorrect, send 400 error back
  if (!validatenote(req.body)) {
      res.status(400).send('The note is not properly formatted.');
  } else {
  // add note to json file and note array in this function
   const note = createNewnote(req.body, notes);

  res.json(note);
  }
});

app.get('/api/notes', (req, res) => {
// get all notes in here 
//figure out a way use json or the id, the title and the text,
//luse local storage to make it persistant,  
//if it goes we need to explain that information
// if error we need to catch that error  
})

app.get('/notes/:id', (req,res) => {
  const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
        //if the parameters don't exist a 404 message will appear
      } else {
        res.send(404);
      }
  // get all notes in here 
//figure out a way use json or the id, the title and the text,
//luse local storage to make it persistant,  
//if it goes we need to explain that information
// if error we need to catch that error 
})

app.get('/api/notes/:id', (req,res) => {
  const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
        //if the parameters don't exist a 404 message will appear
      } else {
        res.send(404);
      }
})



//route to sever.js
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
  });

// //route to a single note
// app.get('/note', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/note.html'));
// });

//if user requests a route that doesn't exist they will be redirected to the homepage--THIS KIND OF ROUTE SHOLD ALWAYS BE LAST IN RELATION TO OTHER ROUTES
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });