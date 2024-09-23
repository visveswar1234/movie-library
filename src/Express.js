const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 1011;


let users = [
  {
    username: 'john_doe',
    wishlist: {
      private: [],
      public: []
    }
  }
];

app.use(cors());
app.use(express.json());

app.get('/wishlist/:username', (req, res) => {
  const { username } = req.params;
  const user = users.find(u => u.username === username);

  if (user) {
    res.json(user.wishlist);
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/wishlist/:username', (req, res) => {
  const { username } = req.params;
  const { movie, isPublic } = req.body;
  const user = users.find(u => u.username === username);

  if (user) {
    if (isPublic) {
      user.wishlist.public.push(movie);
    } else {
      user.wishlist.private.push(movie);
    }
    res.status(200).send('Movie added to wishlist');
  } else {
    res.status(404).send('User not found');
  }
});

app.delete('/wishlist/:username/:imdbID/:isPublic', (req, res) => {
  const { username, imdbID, isPublic } = req.params;
  const user = users.find(u => u.username === username);

  if (user) {
    if (isPublic === 'true') {
      user.wishlist.public = user.wishlist.public.filter(movie => movie.imdbID !== imdbID);
    } else {
      user.wishlist.private = user.wishlist.private.filter(movie => movie.imdbID !== imdbID);
    }
    res.status(200).send('Movie removed from wishlist');
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
