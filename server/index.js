const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const apiRouter = require('./api');

const AppTokenName = 'AuthSuperApp';
const SuperSecretKey = 'secret_key' + Math.random().toString().slice(1, 5);

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
}
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use('/api', checkToken, apiRouter);

app.post('/auth/login', (req, res) => {
  const credentials = req.body;
  const isUserValid = verifyCredentials(credentials);

  if (isUserValid) {
    const token = jwt.sign({ user: credentials.userName }, SuperSecretKey);
    setTimeout(_ => {
      res.cookie(AppTokenName, token).send();
    }, 2000)
  } else {
    setTimeout(_ => {
      res.status(401).send('Something broke!');
    }, 2000)
  }
});

app.listen(3000, () => console.log('Dev server started on port 3000!'));

function verifyCredentials(userCredentials) {
  if (userCredentials.userName &&
    userList[userCredentials.userName] &&
    userList[userCredentials.userName].pass === userCredentials.userPass
  ) {
    return true;
  }

  return false;
}

function checkToken(req, res, next) {
  const authcookie = req.cookies[AppTokenName];

  jwt.verify(authcookie, SuperSecretKey, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else if (data.user) {
      req.user = data.user;
      next();
    }
  });
}

const userList = {
  'user': { pass: 'user' },
  'admin': { pass: 'admin' },
  'JohnSmith': { pass: 'JSPass' }
}
