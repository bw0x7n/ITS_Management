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


 app.get("/acceuill" , function(req, res){
   var id_user = req.user.id;
// console.log(JSON.parse(JSON.stringify(req.user));)
console.log(id_user);
// console.log("user data : ");
// console.log(req.user) ;  @svdwi just check for user data (id)
connection.query('select * from definir  where id = ? ;       ' , id_user  , function(err , rs){
  console.log(rs);
 
  
  res.render("acceuill.ejs", { user:req.user})

});

});






app.post('/delete/:id', function(req, res){

   connection.query('DELETE FROM def WHERE id_user='+req.params.id, function(err, results){
    if(err) throw err;
  });
res.redirect('/acceuill')

  });









app.post('/definir', function(req, res) {

var newdefinir = {
    id : req.user.id,
  intier : req.body.intier,
  compr : req.body.compr,
  analyse : req.body.analyse,
    leadership : req.body.leadership,
    domaine : req.body.leadership,
    politque : req.body.politque,
  management : req.body.management,
    structure : req.body.structure,
    declaration : req.body.declaration
    };

connection.query('insert into  definir  values (?,? ,? ,? ,? ,? ,? ,? ,? ,?) ', [
newdefinir.id ,
newdefinir.intier ,
newdefinir.compr ,
newdefinir.analyse  ,
newdefinir.leadership  ,
newdefinir.domaine  ,
newdefinir.politque ,
newdefinir.management  ,
newdefinir.structure  ,
newdefinir.declaration ], function (err, result) {
res.redirect('/acceuill');
if (err) throw err;
  console.log(result.affectedRows + " record(s) updated ");

});

  });




  app.post('/mettre', function(req, res) {

    var newmettre = {
        id : req.user.id,
        conception : req.body.intier,
        mise : req.body.compr,
        gestion : req.body.analyse,
        communication : req.body.leadership,
        senssibilisaton : req.body.leadership,
        operations : req.body.politque,

        };
      console.log(newmettre.conception);
    connection.query('insert into  mettre  values (?, ? , ? , ? , ? , ? , ? ) ', [
      newmettre.id ,
      newmettre.conception ,
      newmettre.mise ,
      newmettre.gestion  ,
      newmettre.communication  ,
      newmettre.senssibilisaton  ,
      newmettre.operations
       ], function (err, result) {
    res.redirect('/acceuill');
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated ");

    });

      });



  app.post('/SURVEILLER', function(req, res) {
    id=req.body.id;
    suivi=req.body.suivi;
    evaluation=req.body.evaluation;
    audit=req.body.audit;
    direction=req.body.direction;

connection.query('insert into  surveiller  values (?, ?, ? ,? ,?) ', [ id ,suivi,  evaluation , audit ,  direction  ], function (err, result) {
    res.redirect('/acceuill');
    if (err) throw err;
      console.log(result.affectedRows + " record(s) updated ");

    });

      });


      app.post('/maintenir', function(req, res) {
        id=req.body.id;
        maintenir=req.body.maintenir;
        traitement=req.body.traitement;
        Amelioration=req.body.Amelioration;

    connection.query('insert into  maintenir  values (?, ?, ? ,?  ) ', [ id ,maintenir,  traitement , Amelioration   ], function (err, result) {
        res.redirect('/acceuill');
        if (err) throw err;
          console.log(result.affectedRows + " record(s) updated ");

        });

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
connection.query('insert into  users SET ? WHERE id = ?', [{ username: username , password : password, email : email , company : company }, id], function (err, result) {
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