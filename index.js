const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello boomer');
});

app.post('/movie/', async function(req, res) {
  const movieID = Date.now();
  const {
    data,
  } = await axios.post(
    `https://www.jsonstore.io/c05c7552918a9b7f6f8bf7c5e7e46b029bd3cc19d6cf857cde152f84f9379687/${movieID}`,
    req.body,
    { headers: { 'content-type': 'application/json' } }
  );
  res.send(data);
});

app.get('/movies', async function(req, res) {
  const {
    data,
  } = await axios.get(
    'https://www.jsonstore.io/c05c7552918a9b7f6f8bf7c5e7e46b029bd3cc19d6cf857cde152f84f9379687/',
    { headers: { 'content-type': 'application/json' } }
  );
  res.send(data);
});

app.get('/movie/:movieID', async function(req, res) {
  const movieID = req.params.movieID;
  const {
    data,
  } = await axios.get(
    `https://www.jsonstore.io/c05c7552918a9b7f6f8bf7c5e7e46b029bd3cc19d6cf857cde152f84f9379687/${movieID}`,
    { headers: { 'content-type': 'application/json' } }
  );
  res.send(data);
});

app.patch('/movie/:movieID', async function(req, res) {
  const movieID = req.params.movieID;
  const {
    data,
  } = await axios.put(
    `https://www.jsonstore.io/c05c7552918a9b7f6f8bf7c5e7e46b029bd3cc19d6cf857cde152f84f9379687/${movieID}/${req.body.key}`,
    `"${req.body.value}"`,
    { headers: { 'content-type': 'application/json' } }
  );
  res.send(data);
});



app.delete('/movie/:movieID', async function(req, res) {
  const movieID = req.params.movieID;
  const {
    data,
  } = await axios.delete(
    `https://www.jsonstore.io/c05c7552918a9b7f6f8bf7c5e7e46b029bd3cc19d6cf857cde152f84f9379687/${movieID}`,
    { headers: { 'content-type': 'application/json' } }
  );
  res.send(data);
});

app.listen(3000, () => console.log('hello'));
