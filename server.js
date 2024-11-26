const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Routes
server.get('/do_a_random', (req, res) => {
    res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
  })

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))


// Handle form submission
server.post('/submit', (req, res) => {
  const { noun, verb, adjective, place, pluralNoun } = req.body;

  if (!noun || !verb || !adjective || !place || !pluralNoun) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
    return;
  }

  const madLib = `
    Once upon a time in a ${adjective} ${place}, there lived a ${noun} 
    who loved to ${verb} with ${pluralNoun}.
  `;

  res.send(`
    <h1>Your Mad Lib Result Is Ready!!!</h1>
    <p>${madLib}</p>
    <a href="/ITC505/lab-7/index.html">Do that again!!</a>
  `);
  
});


// Start the server
// let port = 80;
// if (process.argv[2] === 'local') {
//   port = 8080;
// }
// server.listen(port, () => console.log('Ready on localhost!'));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server is running on port ${port}`));