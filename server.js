const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cookieParser());
    server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
    server.get('/p/:id', (req, res) => {
      const actualPage = '/post';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });
    server.get('/user/:id', (req, res) => {
      const actualPage = '/user';
      const queryParams = { id: req.params.id };
      //res.cookie('token', '234e234d!#D!##$^%D@W$!324', { maxAge: 900000, httpOnly: true});
      // var cookie = req.cookies.token;
      // if (typeof cookie != 'undefined') {
      //   console.log('cookie exists', cookie);
      // }
      app.render(req, res, actualPage, queryParams);
    });
    server.get('/Counter-Cart', (req, res) => {
      const actualPage = '/counter';
      app.render(req, res, actualPage);
    });
    server.get('*', (req, res) => {
      return handle(req, res);
    });
    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });