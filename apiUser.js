const express = require('express');
const axios = require('axios');
const router = express.Router();

router.use(express.json());

router.post('/user', async function(req, res) {
  console.log(req.body);
  const userID = Date.now();
  const {
    data,
  } = await axios.post(
    `https://www.jsonstore.io/a5d943323dbedc6f0b466f52b0c8433e3ef181255bfe0b64385584bc36c5fa24/users/${userID}`,
    req.body,
    { headers: { 'content-type': 'application/json' } }
  );
  res.send(data);
});

router.get('/', async function(req, res) {
  const { data } = await axios.get(
    `https://www.jsonstore.io/a5d943323dbedc6f0b466f52b0c8433e3ef181255bfe0b64385584bc36c5fa24/users/`
  );
  res.send(data);
});

router.get('/user/:userID', async function(req, res) {
  console.log(req.params);
  const userID = req.params.userID;
  const { data } = await axios.get(
    `https://www.jsonstore.io/a5d943323dbedc6f0b466f52b0c8433e3ef181255bfe0b64385584bc36c5fa24/users/${userID}`
  );
  res.send(data);
});

router.put('/user/:userID', async function(req, res) {
  const userID = req.params.userID;
  const {
    data,
  } = await axios.put(
    `https://www.jsonstore.io/a5d943323dbedc6f0b466f52b0c8433e3ef181255bfe0b64385584bc36c5fa24/users/${userID}/`,
    req.body,
    { headers: { 'content-type': 'application/json' } }
  );
  res.send(data);
});

router.patch('/user/:userID', async function(req, res) {
  console.log(req.body);
  const userID = req.params.userID;
  const {
    data,
  } = await axios.put(
    `https://www.jsonstore.io/a5d943323dbedc6f0b466f52b0c8433e3ef181255bfe0b64385584bc36c5fa24/users/${userID}/${req.body.key}`,
    `"${req.body.val}"`,
    { headers: { 'content-type': 'application/json' } }
  );
  res.send(data);
});

router.delete('/user/:userID', async function(req, res) {
  const userID = req.params.userID;
  const {
    data,
  } = await axios.delete(
    `https://www.jsonstore.io/a5d943323dbedc6f0b466f52b0c8433e3ef181255bfe0b64385584bc36c5fa24/users/${userID}`,
    { headers: { 'content-type': 'application/json' } }
  );
  res.send(data);
});

module.exports = router;
