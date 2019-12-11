const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get(('/test', (req, res) => res.json({ hello: 'you' })));

const URL =
  'https://www.jsonstore.io/c05c7552918a9b7f6f8bf7c5e7e46b029bd3cc19d6cf857cde152f84f9379687';

router.use(express.json());

router.use('*', (req, res, next) => {
  const idRequest = Date.now();
  console.log(req.body);
  const { data } = axios.post(
    `${URL}/query/${idRequest}`,
    {
      verb: `${req.method}`,
      body: `${JSON.stringify(req.body)}`,
      params: `${JSON.stringify(req.params)}`,
      ipUser: `${req.ip}`,
    },
    {
      headers: { 'content-type': 'application/json' },
    }
  );
  next();
});

async function verifyMovie(req, res, next) {
  const movieID = req.params.movieID;
  const {
    data: { result },
  } = await axios.get(`${URL}/${movieID}`);
  result ? next() : res.redirect(`/error`);
}

router.get('/', (req, res) => {
  res.send('hello boomer');
});

router.get('/error', function(req, res) {
  res.send('ERROR, THIS MOVIE DOSNT EXIST');
});

router.post('/movie/', async function(req, res) {
  const movieID = Date.now();
  const { data } = await axios.post(`${URL}/${movieID}`, req.body, {
    headers: { 'content-type': 'application/json' },
  });
  res.send(data);
});

const asyncRoute = asyncFunction => async (req, res, next) => {
  try {
    await asyncFunction(req, res, next);
  } catch (e) {
    next();
  }
};

router.get(
  '/',
  asyncRoute(async function(req, res) {
    const { data } = await axios.get(`${URL}`, {
      headers: { 'content-type': 'application/json' },
    });
    res.send(data);
  })
);

router.get('/movie/:movieID', verifyMovie, async function(req, res) {
  const movieID = req.params.movieID;
  const { data } = await axios.get(`${URL}/${movieID}`, {
    headers: { 'content-type': 'application/json' },
  });
  res.send(data);
});

router.patch('/movie/:movieID', verifyMovie, async function(req, res) {
  const movieID = req.params.movieID;
  const { data } = await axios.put(
    `${URL}/${movieID}/${req.body.key}`,
    `"${req.body.value}"`,
    { headers: { 'content-type': 'application/json' } }
  );
  res.send(data);
});

router.put('/movie/:movieID', verifyMovie, async function(req, res) {
  const movieID = req.params.movieID;
  const { data } = await axios.put(`${URL}/${movieID}/`, req.body, {
    headers: { 'content-type': 'application/json' },
  });
  res.send(data);
});

router.delete('/movie/:movieID', verifyMovie, async function(req, res) {
  const movieID = req.params.movieID;
  const { data } = await axios.delete(`${URL}/${movieID}`, {
    headers: { 'content-type': 'application/json' },
  });
  res.send(data);
});

router.all('*', (req, res) => {
  res.send('error');
});

module.exports = router;
