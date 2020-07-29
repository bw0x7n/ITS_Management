var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);


module.exports = function(app, passport) {
 app.get('/', function(req, res){
  res.render('index.ejs');
 });

 app.get('/login', function(req, res){
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });

 app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
 }),
  function(req, res){
   if(req.body.remember){
    req.session.cookie.maxAge = 1000 * 60 * 3;
   }else{
    req.session.cookie.expires = false;
   }
   res.redirect('/');
  });

 app.get('/signup', function(req, res){
  res.render('signup.ejs', {message: req.flash('signupMessage')});
 });

 
 app.get('/acceuill', isLoggedIn, function(req, res){
  res.render('acceuill.ejs', {
   user:req.user
  });
 }); 
 
 
 
 app.get('/setting', isLoggedIn, function(req, res){
  res.render('setting.ejs', {
   user:req.user
   
  });
  
  
  
  app.post('/setting', function(req, res) {



var username =req.body.username ; 
var password = req.body.password ; 
var id = req.user.id ; 
  
connection.query('UPDATE users SET username = ? and password= ? WHERE id = ?',
                     {username: username, password: password,id : id})
// connection.query('UPDATE users SET username = ? and password= ? WHERE id = ?', [,username, password, id])



// console.log('req.body');
// console.log(req.body);
// res.write('You sent the name "' +username+'".\n');
// res.write('You sent the Email "' + req.body.password+'".\n');
// res.write('You sent the Email "' + req.user.id+'".\n');
// res.end()





 
});


  
  
  
  
  
  
// connection.connect(function(err) {
  // if (err) throw err;
  // var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
  // connection.query(sql, function (err, result) {
    // if (err) throw err;
    // console.log(result.affectedRows + " record(s) updated");
  // });
// });
  
  
 });
 
 
//definir
 app.get('/definir', function(req, res){
  res.render('definir.ejs', {message: req.flash('signupMessage')});
 });



 
 
 app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
 }));

 app.get('/profile', isLoggedIn, function(req, res){
  res.render('profile.ejs', {
   user:req.user
  });
 });

 app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
 })
};

function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();

 res.redirect('/');
}