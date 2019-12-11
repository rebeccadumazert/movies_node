const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const movieRouter = require('./apiMovie');
const userRouter = require('./apiUser');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/movies', movieRouter);
app.use('/api/users', userRouter);

app.listen(3000, () => console.log('hello'));
