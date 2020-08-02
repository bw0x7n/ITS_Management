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
 
 
 app.get('/indexx', function(req, res){
  res.render('indexx.ejs', {message:req.flash('loginMessage')});
 }); 
 
 
 
 app.get('/contact', function(req, res){
  res.render('contact.ejs', { user: req.user });

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

 
//  app.get('/acceuill', isLoggedIn, function(req, res){
//           res.render('acceuill.ejs', {
//           user:req.user
//             });
  
  
//  }); 
 
 
 
 // app.get('/show'  , function(req , res ,next){
	 
	 // connection.query('select * from users ' , function(err , rs){
		
 // if (err) throw err;
    // console.log(r);
  // });

		

	 
	 
 // });
 
 
//  app.get("/acceuill" , function(req, res){


  //  var id_user = req.user.id;
// console.log(JSON.parse(JSON.stringify(req.user));)

// console.log("user data : ");
// console.log(req.user) ;  @svdwi just check for user data (id) 

// connection.query('select * from definir where id = ? , select * from mettre where id = ?  ' ,[id_user , id_user] , function(err , rs){	 
    // var articles = JSON.parse(JSON.stringify(rs)); 

    // console.log(rs[0]);

    // res.render("acceuill.ejs", {articles: articles , user:req.user})

// });
    
// });
 
 


app.get('/acceuill',(req, res) => {
  var id_user = req.user.id;
  console.log(req.user);
   var sql1 = 'SELECT * FROM definir where id = ?  ';
   var sql2 = 'SELECT * FROM mettre where id = ?  ';
   var sql3 = 'SELECT * FROM maintenir where id = ?  ';
   var sql4 = 'SELECT * FROM surveiller where id = ?  ';
 

   connection.query(sql1,  id_user ,  function(err, definir){
      if (err) throw err; //you should use this for error handling when in a development environment
      console.log(definir); //this should print

      connection.query(sql2,id_user ,  function(err, mettre) {
          if (err) throw err;
          console.log(mettre);

          connection.query(sql3, id_user ,  function(err, maintenir) {
            if (err) throw err;
            console.log(maintenir);  
            
            connection.query(sql4, id_user ,  function(err, surveiller) {
              if (err) throw err;
              console.log(surveiller);

           res.render('acceuill.ejs', {user:req.user , definir:definir, mettre:mettre, maintenir:maintenir, surveiller:surveiller});
          });  });  
        });  
      });
});







 

app.post('/delete/:id', function(req, res){
 
   connection.query('DELETE FROM def WHERE id_user='+req.params.id, function(err, results){
    if(err) throw err;
  });
res.redirect('/acceuill')

  });






 
 app.get('/setting', isLoggedIn, function(req, res){
  res.render('setting.ejs', {user:req.user});
});
  
  
app.post('/setting', function(req, res) {
var username =req.body.username; 
var password1 = req.body.password; 
var password2 = req.body.passwordtwo;
var email = req.body.email;
var company = req.body.company;
// // console.log(username);
// // console.log(password1);
console.log(req.body);



var password = bcrypt.hashSync(req.body.password, null, null) ; 
var id = req.user.id ; 
connection.query('UPDATE users SET ? WHERE id = ?', [{ username: username , password : password, email : email , company : company }, id], function (err, result) {
  res.redirect('/acceuill');  
  if (err) throw err;
    console.log(result.affectedRows + " record(s) updated ");
    
  });

});


  
  
  
  
  
  
// connection.connect(function(err) {
  // if (err) throw err;
  // var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
  // connection.query(sql, function (err, result) {
    // if (err) throw err;
    // console.log(result.affectedRows + " record(s) updated");
  // });
// });
  
 
//definir
  



 
 
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