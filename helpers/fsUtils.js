const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
  /**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

// function to remove note by id
const readAndRemove = (id, file) => {

    // take parameter for id of note that need to delete
    // read the file
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
             // parse the data back to array
            const parsedData = JSON.parse(data);
            
            console.log(parsedData);
            // for loop to check for all array element
           for (i=0; i < parsedData.length; i++) {
               // if the id = array[i].id then delete it from the array
                //console.log(parsedData[i]);
                //console.log(parsedData[i].id);

               if (id === parsedData[i].id) {
                   console.log(parsedData[i]);
                   
                   const x = parsedData.splice(i,1);
                   console.log(x);
                   // stringify the array of notes again
                   // write the file.
                //    writeToFile(file, parsedData);
               }
           } 


        }
    });

};


module.exports = { readFromFile, writeToFile, readAndAppend, readAndRemove };
