const express = require('express');
const app = express();
const session = require('express-session');
var bodyParser = require('body-parser')
const methodoverride = require('method-override');
const nodemailer = require("nodemailer");


var fs = require('fs');
var path = require('path');
require('dotenv/config');
var mongoose = require('mongoose');

var alert = require('alert');



const port = process.env.PORT || 2000;

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'ssshhhhh', resave: true, saveUninitialized: true }));
app.use(express.static('./public'));


const UserName = require('./src/model/userName.model');
const UserData = require('./src/model/user.model');

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(methodoverride('_method'));

 // create reusable transporter object using the default SMTP transport
    
      let mailTransporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user:"testservice152@gmail.com",
              pass: "Flower@123",
          },
      });
 

app.get('/', function (req, res) {
  res.render('index', {
      title: 'Diwali wishes'
  });
});
app.post('/signup', async (req, res) => {
  const user = req.body;
  await UserName.create(user);
  res.render('signup',{
  user,
   title : 'Diwali wishes'
  });
});

app.post('/add', async (req, res) => {
    const user = req.body;
    
   const userdata = await UserData.create(user);
   
  res.render('login',{
    user:userdata,
     title : 'Diwali wishes'
  });
});


app.get('/:id', async function (req, res) {  
  book = await UserData.findById(req.params.id)      
    res.render('wish', {
                title: 'Diwali Wishes App',
      book
    });
   });


   
app.post('/test', async (req, res) => {
  const usr = req.body;
  
  // setup email data with unicode symbols
  let mailDetails = {
    from: "testservice152@gmail.com",
    to: usr.email1,
    subject: "Diwali Wishes "+usr.user1name,
    text: "***Happy Diwali*** "+usr.user1name
};

  // send mail with defined transport object
 
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
        console.log("Error Occurs");  
        alert("Error in sending Email "+usr.user1name);                    
        res.render('test')
    } else {
        console.log("Email sent successfully"+usr.user1name);         
        res.render('test',{error1:`Diwali Wishes Email sent successfully to ${usr.user1name} with email ${usr.email1}`,} )
        alert("Email sent successfully"+usr.user1name);
    }
});

});

app.listen(port , ()=> {
  console.log('Server ready at' + port)
  
});
