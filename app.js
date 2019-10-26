const fs = require('fs');
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const SMTPConnection = require('nodemailer/lib/smtp-connection');
const SMTPServer = require('smtp-server').SMTPServer;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, xPoweredBy: false });
const handle = app.getRequestHandler();
app
  .prepare()
  .then(() => {
    const server = express();
    server.disable('x-powered-by');
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
// // Starts a SMTP server using TLS with your own certificate and key
// const mailServer = new SMTPServer({
//   authOptional: true,
//   secure: true,
//   // key: fs.readFileSync('private.key'),
//   // cert: fs.readFileSync('server.crt'),
//   //logger: true,
//   debug: true,
//   onAuth(auth, session, callback) {
//     if (auth.username !== 'test' || auth.password !== 'password') {
//       return callback(new Error('Invalid username or password'));
//     }
//     callback(null, {
//       user: 'test'
//     });
//   }
// });
// mailServer.listen(465, err => {
//   if (err) throw err;
//   console.log('SMTP server is Ready.');
// });
// let transporter = nodemailer.createTransport({
//   transport: 'SMTP',
//   host: 'https://qarun.ir',
//   port: 465,
//   secure: true, // use TLS
//   auth: {
//     user: 'test',
//     pass: 'password'
//   },
//   // host: "smtp.mailtrap.io",
//   // port: 2525,
//   // auth: {
//   //   user: "a3c47718e3491e",
//   //   pass: "1c39d5a8edbdb8"
//   // },
//   tls: {
//     rejectUnauthorized: false
//   },
//   debug: true
//   //logger: true
// });
// const mailOptions = {
//   from: '"Qarun" <info@qarun.ir>',
//   to: 'hh.oomph@gmail.com',
//   subject: 'Sending Email using Node.js',
//   html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
// };
// transporter.sendMail(mailOptions, function(error, info) {
//   if (error) {
//     console.log('sendmail' + error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
//   transporter.close();
// });