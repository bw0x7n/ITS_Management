var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {
 passport.serializeUser(function(user, done){
  done(null, user.id);
 });

 passport.deserializeUser(function(id, done){
  connection.query("SELECT * FROM users WHERE id = ? ", [id],
   function(err, rows){
    done(err, rows[0]);
   });
 });

 passport.use(
  'local-signup',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },



  function(req, username, password, done){
   connection.query("SELECT * FROM users WHERE username = ? ", 
   [username], function(err, rows){
    if(err)
     return done(err);
    if(rows.length){
     return done(null, false, req.flash('signupMessage', 'That is already taken'));
    }else{

    //   bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash(password, salt, function(err, hash) {
    //        const   password = hash ; 
    //     });
    // });


 
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
 

    console.log(hash) ; 
 
     var newUserMysql = {
      username: username,
      password: hash
     };



     console.log(newUserMysql.password);
     var insertQuery = "INSERT INTO users (username, password) values (?, ?)";

     connection.query(insertQuery, [newUserMysql.username, newUserMysql.password],
      function(err, rows){
       newUserMysql.id = rows.insertId;

       return done(null, newUserMysql);
      });
    }
   });
  })
 );

 passport.use(
  'local-login',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },

   
  function(req, username, password, done){
   connection.query("SELECT * FROM users WHERE username = ? ", [username],
   function(err, rows){
    console.log(username);
    console.log(password) ;
    if(err)
     return done(err);

     console.log(rows.length) ;

    if(!rows.length){
     return done(null, false, req.flash('loginMessage', 'No User Found'));
    }


    console.log(password) ;
    console.log(rows[0].password);

    var bool = bcrypt.compareSync(password, rows[0].password); // true






    
console.log(bool);

    // bcrypt.compare(password,rows[0].password, (err, succ) => {
    // console.log(succ); 
    //   // if (!succ) { 
    //   //   return done(null,false,  rows[0]);
      
    //   // }
    // } ) ; 
          
        





  //   bcrypt.compare(password, rows[0].password, function(err, result) {
  //     console.log(result);
  //     if(!result){
  //       // return done(null, false, req.flash('loginMessage', 'Wrong Password'));
  //     }
  //  });

//       var result  = bcrypt.compareSync(password, rows[0].password) ; 
// console.log(result);
//         if(!result)
//           return done(null, false, req.flash('loginMessage', 'Wrong Password'));

    return done(null, rows[0]);
   });
  })
 );
};