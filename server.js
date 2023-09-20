const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 443; // Choose the port you want to use

app.use(bodyParser.json());

// W markov chains
let savedMarkovChains = [];

// Endpoint to update shared content
app.post('/save-chain', (req, res) => {
  const newContent = req.body.content;
  sharedMarkovChains.push(newContent); // Add new content to the array
  res.json({ message: 'Content updated successfully' });
});

// Endpoint to retrieve shared content
app.get('/get-saved-chains', (req, res) => {
  const content = savedMarkovChains;
  res.json({ content });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

