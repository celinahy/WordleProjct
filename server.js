const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // Change this to your desired port number
//const path = require('path');

app.use(cors());
app.use(express.json());

// Define your API endpoint
app.get('/v1/wordle', async (req, res) => {
  // Check if the provided API key matches your expected key
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== 'sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv') {
    return res.status(401).json({ status: 'Unauthorized' });
  }

  // Your dictionary with words and hints
  const response = {
    statusCode: 200,
    dictionary: [
      {
        word: 'Pain',
        hint: 'A common feeling tha makes a person say "ouchie"',
      },
      {
        word: 'Nerd',
        hint: 'You may be considered one if you like Star Trek',
      },
      {
        word: 'Door',
        hint: 'you walk through this everyday, hopefully',
      },
      {
        word: 'Ball',
        hint: 'This thing is used in many sports',
      },
      {
        word: 'Call',
        hint: 'You use a phone to do this',
      },
      {
        word: 'Face',
        hint: '"I cant feel my ____ when im with you" is a song lyric by The Weekend',
      },
      {
        word: 'Fish',
        hint: 'They live in the ocean and we can eat them',
      },
      {
        word: 'Cook',
        hint: 'A common hobby which involves spices',
      },
      {
        word: 'City',
        hint: 'A lo0cal region with lots of building and where people reside in',
      },
      {
        word: 'Hand',
        hint: 'Can I give you a helping ____?',
      },
      {
        word: 'Hall',
        hint: 'The area that leads to a door',
      },
      {
        word: 'Back',
        hint: 'I want you to scratch my ____',
      },
      {
        word: 'Care',
        hint: 'Take ____ of me please when im sick',
      },
      {
        word: 'Cost',
        hint: 'Something associated with something you want to buy',
      },
      {
        word: 'Fact',
        hint: 'A scientifically proven hypothesis',
      },
      {
        word: 'Fire',
        hint: 'Yo, this soup is ____',
      },
      {
        word: 'Help',
        hint: 'Youre stuck in a ditch, so you should yell this',
      },
      // Add more word/hint objects as needed
    ],
  };

  res.status(200).json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
