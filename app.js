var path = require('path');

var pages = require('./modules/pages');
var authorization = require('./modules/authorization');
var users = require('./modules/users');

var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
var MemoryStore = session.MemoryStore;
app.use(session({
  secret: 'secretkey',
  resave: false,
  store: new MemoryStore(),
  saveUninitialized: true
}))

var options = {
  index: false
}
app.use(express.static(path.join(__dirname, 'public'), options));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var multer = require('multer');
var upload = multer();
app.use(upload.array());

users.createSchema();

app.all('/', function (req, res, next) {
  authorization.check(req) ? res.redirect('/table') : next();
});

app.all('/table', async function (req, res, next) {
  authorization.check(req) ? next() : res.redirect('/');
});

app.get('/', function (req, res) {
  pages.sendHTML(res, 'index.html');
});

app.get('/table', async function (req, res) {
  if ((await checkAtack(req))) {
    authorization.set(req, false);
    res.redirect('/');
  }
  pages.sendHTML(res, 'table.html');
});

app.get('/logout', function (req, res) {
  authorization.set(req, false);
  res.redirect('/');
});

app.post('/login', async function (req, res) {
  let user = await users.getUser(req.body.username);
  if (user) {
    if (req.body.password == user.password) {
      if (user.blocked == 0) {
        await users.updateUserLoginDate(req.body.username);
        authorization.set(req, true, user.id);
        res.redirect('/table');
      } else {
        pages.sendError(res, 'You are blocked');
      }
    } else {
      pages.sendError(res, 'Wrong password');
    }
  } else {
    pages.sendError(res, 'No such user');
  }
});

app.post('/signup', async function (req, res) {
  let user = await users.getUser(req.body.username);
  if (user) {
    pages.sendError(res, 'Name is unavailable');
  } else {
    await users.insertUser(req.body.username, req.body.password, req.body.email);
    user = await users.getUser(req.body.username);
    authorization.set(req, true, user.id);
    res.redirect('/table');
  }
});

app.get('/users', async function (req, res) {
  let users_list = await users.getAllUsers();
  res.send(JSON.stringify(users_list));
  res.end();
});

app.post('/block', async function (req, res) {
  if ((await checkAtack(req))) {
    authorization.set(req, false);
    res.redirect('/');
  }
  for (let id in req.body) {
    if (id == req.session.userid) {
      authorization.set(req, false);
    }
    await users.blockUser(id, true);
  }
  res.redirect('/table');
});

app.post('/unblock', async function (req, res) {
  if ((await checkAtack(req))) {
    authorization.set(req, false);
    res.redirect('/');
  }
  for (let id in req.body) {
    if (id != req.session.userid) {
      await users.blockUser(id, false);
    }
  }
  res.redirect('/table');
});

app.post('/delete', async function (req, res) {
  if ((await checkAtack(req))) {
    authorization.set(req, false);
    res.redirect('/');
  }
  for (let id in req.body) {
    if (id == req.session.userid) {
      authorization.set(req, false);
    }
    await users.deleteUser(id);
  }
  res.redirect('/table');
});

async function checkAtack(req) {
  if (authorization.check(req)) {
    let user = await users.findUser(req.session.userid);
    if (!user || user.blocked == 1) {
      return true;
    }
  }
  return false;
}

module.exports = app;