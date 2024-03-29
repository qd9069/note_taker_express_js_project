const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndRemove } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting notes
notes.post('/', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    console.log(req.body);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
});
  
// DELETE Route for deleting note by id

notes.delete('/:id',(req, res) => {
    // Log that a DELETE request was received
    console.info(`${req.method} request received to delete a note`);

    // console.log("req.params", req.params);
    console.log("delete note with id", req.params.id);

    // run the function to delete note
    readAndRemove(req.params.id, './db/db.json');

    // Respond to the DELETE request
    res.json(`Note with ID: ${req.params.id} has been deleted 🗑️`);

});


module.exports = notes;