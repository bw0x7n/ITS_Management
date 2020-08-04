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
// login route 
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








 app.post('/SURVEILLER', isLoggedIn, function(req, res){
  var newSURVEILLER = {
     id_user : req.body.id,
     suivi : req.body.suivi,
     evaluation : req.body.evaluation,
     audit : req.body.audit,
     direction : req.body.direction,
     date : timer() 

  }
  console.log(newSURVEILLER);

  var insertQuery = "INSERT INTO `surveiller` (`id`, `id_user` ,  `suivi`, `evaluation`, `audit`, `direction`,`date`) VALUES (?,?,?,?,?,?,?)";

  connection.query(insertQuery, [ , 
    newSURVEILLER.id_user,
    newSURVEILLER.suivi,
    newSURVEILLER.evaluation, 
    newSURVEILLER.audit,
    newSURVEILLER.direction,
    newSURVEILLER.date
     ] , 
   function(err, rs){
     newSURVEILLER.id = rs.insertId;


    if (err) throw err;
 console.log(rs);
    
   });
   res.redirect('/acceuill');


}); 

 



























function timer () {
let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
return year+'/'+month+'/'+date ; 
}

 app.post('/maintenir', isLoggedIn, function(req, res){
  var newmaintenir = {
     id_user : req.body.id,
     maintenir : req.body.maintenir,
     traitement : req.body.traitement,
     Amelioration : req.body.Amelioration,
     date : timer() 

  }
  console.log(newmaintenir);
console.log(timer()); 
  var insertQuery = "INSERT INTO `maintenir`(`id`, `id_user`,  `maintenir`, `traitement`, `Amelioration`,`date`) VALUES (?,?,?,?,?,?)";

  connection.query(insertQuery, [ ,
    newmaintenir.id_user,
    newmaintenir.maintenir,
    newmaintenir.traitement, 
    newmaintenir.Amelioration,
    newmaintenir.date
     ] , 
   function(err, rs){
    newmaintenir.id = rs.insertId;

    if (err) throw err;
 console.log(rs);
    
   });

   res.redirect('/acceuill');

}); 


app.post('/update_main', isLoggedIn, function(req, res){
  var newmaintenir = {
    id : req.body.id , id_user : req.body.id_user,
     maintenir : req.body.maintenir,
     traitement : req.body.traitement,
     Amelioration : req.body.Amelioration,
     date : timer() 

  }
  console.log('----------newmaintenir---------------')
  console.log(newmaintenir);

console.log(timer()); 
  var insertQuery = "UPDATE `maintenir` SET `maintenir`= ? ,`traitement`= ? ,`Amelioration`= ? ,`date`= ? WHERE  id_user = ? and id = ? ";

  connection.query(insertQuery, [  
    newmaintenir.maintenir,
    newmaintenir.traitement, 
    newmaintenir.Amelioration,
    newmaintenir.date,
    newmaintenir.id_user,
    newmaintenir.id

     ] , 
   function(err, rs){
    newmaintenir.id = rs.insertId;

    if (err) throw err;
 console.log(rs);
    
   });

   res.redirect('/acceuill');

}); 





 
 

  app.post('/definir', isLoggedIn, function(req, res){
    var newdefinir = {
       id_user : req.body.id,
      intier : req.body.intier,
      compr : req.body.compr,
      analyse : req.body.analyse,
      leadership : req.body.leadership,
      domaine : req.body.domaine,
       politque : req.body.politque,
      management : req.body.management,
      structure : req.body.structure,
      declaration : req.body.declaration,
      date : timer() 
    }
 



    console.log(newdefinir);

    var insertQuery = "INSERT INTO `definir`(`id`,`id_user`, `intier`, `compr`, `analyse`, `leadership`, `domaine`, `politque`, `management`, `structure`, `declaration`,`date`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ";

    connection.query(insertQuery, [ , 
       newdefinir.id_user,
      newdefinir.intier,
       newdefinir.compr, 
      newdefinir.analyse,
       newdefinir.leadership, 
      newdefinir.domaine,
       newdefinir.politque, 
      newdefinir.management,
       newdefinir.structure,
      newdefinir.declaration,
      newdefinir.date] , 
     function(err, rs){
      newdefinir.id = rs.insertId;


      if (err) throw err;
   console.log(rs);
      
     });

     res.redirect('/acceuill');

  }); 
  





  app.post('/update_def', isLoggedIn, function(req, res){
    var newdefinir = { id : req.body.id , id_user : req.body.id_user,  
      intier : req.body.intier,compr : req.body.compr,
       analyse : req.body.analyse,leadership : req.body.leadership, 
       domaine : req.body.domaine,  politque : req.body.politque, 
        management : req.body.management, structure : req.body.structure, 
        declaration : req.body.declaration, date : timer()  }

    var insertQuery = "UPDATE `definir` SET  `intier`=?,`compr`=?,`analyse`=?,`leadership`=?,`domaine`=?,`politque`=?,`management`=?,`structure`=?,`declaration`=?,`date`=? where id_user = ?  and id = ? ";

    connection.query(insertQuery, [  newdefinir.intier, newdefinir.compr,   newdefinir.analyse, newdefinir.leadership, newdefinir.domaine, newdefinir.politque, newdefinir.management,newdefinir.structure, newdefinir.declaration,newdefinir.date , id_user , id ] , function(err, rs){
      newdefinir.id = rs.insertId;
      if (err) throw err;
   console.log(rs);
         });

     res.redirect('/acceuill');
  }); 
  



  app.post('/update_surr', isLoggedIn, function(req, res){
    var newSURVEILLER = {
      id : req.body.id ,
      id_user : req.body.id_user,
       suivi : req.body.suivi,
       evaluation : req.body.evaluation,
       audit : req.body.audit,
       direction : req.body.direction,
       date : timer() 
  
    }

    console.log(" ----- newSURVEILLER --------- ")
    console.log(newSURVEILLER);
  
    var insertQuery = "UPDATE `surveiller` SET  `suivi`=?,`evaluation`=?,`audit`=?,`direction`=?,`date`=? WHERE id_user = ? and id = ? ";
  
    connection.query(insertQuery, [ 
      newSURVEILLER.suivi,
      newSURVEILLER.evaluation, 
      newSURVEILLER.audit,
      newSURVEILLER.direction,
      newSURVEILLER.date,
      newSURVEILLER.id_user,
      newSURVEILLER.id

       ] , 
     function(err, rs){
  
      if (err) throw err;
   console.log(' updated surrr  ');
      
     });
     res.redirect('/acceuill');
  
  
  }); 
  





  app.post('/update_met', isLoggedIn, function(req, res){
    var newmettre = {id : req.body.id ,
       id_user : req.body.id_user,
       conception : req.body.conception,
       mise : req.body.mise,
       gestion : req.body.gestion,
       communication : req.body.communication,
       senssibilisaton : req.body.senssibilisaton,
       operations : req.body.operations,
       date : timer() 

    }
    console.log(newmettre);

    var insertQuery = "UPDATE `mettre` SET  `conception`=?,`mise`=?,`gestion`=?,`communication`=?,`senssibilisaton`=?,`operations`=?,`date`=? and id= ? and id_user= ?  ";

    connection.query(insertQuery, [   
      newmettre.conception,
      newmettre.mise, 
      newmettre.gestion,
      newmettre.communication, 
      newmettre.senssibilisaton,
      newmettre.operations,
      newmettre.date,
      newmettre.id , 
      newmettre.id_user 
      ] , 
     function(err, rs){
      newmettre.id = rs.insertId;

      if (err) throw err;
   console.log(rs);
      
     });

res.redirect('/acceuill');
  }); 
  










  app.post('/mettre', isLoggedIn, function(req, res){
    var newmettre = {
       id_user : req.body.id,
       conception : req.body.conception,
       mise : req.body.mise,
       gestion : req.body.gestion,
       communication : req.body.communication,
       senssibilisaton : req.body.senssibilisaton,
       operations : req.body.operations,
       date : timer() 

    }
    console.log(newmettre);

    var insertQuery = "INSERT INTO `mettre`(`id`, `id_user` , `conception`, `mise`, `gestion`, `communication`, `senssibilisaton`, `operations`,`date`) VALUES (?, ?,?,?,?,?,?,?,?)";

    connection.query(insertQuery, [  , 
      newmettre.id_user,
      newmettre.conception,
      newmettre.mise, 
      newmettre.gestion,
      newmettre.communication, 
      newmettre.senssibilisaton,
      newmettre.operations,
      newmettre.date
      ] , 
     function(err, rs){
      newmettre.id = rs.insertId;

      if (err) throw err;
   console.log(rs);
      
     });

res.redirect('/acceuill');
  }); 
  

 
//  app.get('/acceuill', isLoggedIn, function(req, res){
//           res.render('acceuill.ejs', {
//           user:req.user
//             });
  
  
//  }); 
 
 
 
  //  app.get('/show'  , function(req , res ,next){
	 
	//    connection.query('select * from users ' , function(err , rs){
		
  // if (err) throw err;
  //   console.log(r);
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
   var sql1 = 'SELECT * FROM definir where id_user = ?  ';
   var sql2 = 'SELECT * FROM mettre where id_user = ?  ';
   var sql3 = 'SELECT * FROM maintenir where id_user = ?  ';
   var sql4 = 'SELECT * FROM surveiller where id_user = ?  ';
 

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







 


app.get('/delete/:table/:id/:id_user', function(req, res){


  console.log(req.params.id);
  console.log(req.params.id_user);

  if (req.params.table == 'definir'){
    connection.query('DELETE FROM definir WHERE id='+req.params.id+' and id_user = '+req.params.id_user, function(err, results){
     if(err) throw err;
    });

  } else if (req.params.table == 'mettre'){

    connection.query('DELETE FROM mettre WHERE id='+req.params.id+' and id_user = '+req.params.id_user, function(err, results){
      if(err) throw err;
     });



  }else if (req.params.table == 'surveiller'){
    connection.query('DELETE FROM surveiller WHERE id='+req.params.id+' and id_user = '+req.params.id_user, function(err, results){
      if(err) throw err;
     });



  }else if (req.params.table == 'maintenir'){
    connection.query('DELETE FROM maintenir WHERE id='+req.params.id+' and id_user = '+req.params.id_user, function(err, results){
      if(err) throw err;
     });

  }

  res.redirect('/acceuill') 

  });














  

  app.get('/edit', function(req, res){

    id= req.query.id ; 
    id_user = req.query.id_user;
    type = req.query.type ; 
    console.log("--------------mainnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn-----------------") ; 
    console.log(id) ; 
    console.log(id_user);
    console.log(type);

  var sql1 = 'SELECT * FROM definir where id_user = ?  and id = ?  ';
   var sql2 = 'SELECT * FROM mettre where id_user = ?  and id = ?  ';
   var sql3 = 'SELECT * FROM maintenir where id_user = ?  and id = ?   ';
   var sql4 = 'SELECT * FROM surveiller where id_user = ?  and id = ?   ';
 
if ( type === 'maintenir'){
  connection.query(sql3,[ id_user ,id],  function(err, main_edit) {
    if (err) throw err;
    console.log(main_edit);  
    res.render('edit.ejs', { type : type  , user:req.user ,id : req.query.id , main_edit:main_edit});

  });

}


if ( type === 'definir'){

   connection.query(sql1, [ id_user ,id],  function(err, def_edit){
      if (err) throw err; //you should use this for error handling when in a development environment
      console.log(def_edit); //this should print
      res.render('edit.ejs', { def_edit : def_edit , type : type  , user:req.user ,id : req.query.id });

    });

  }

  if ( type === 'mettre'){

      connection.query(sql2,[ id_user ,id],  function(err, met_edit) {
          if (err) throw err;
          console.log(met_edit);
          res.render('edit.ejs', {   type : type  ,  user:req.user ,id : req.query.id , met_edit:met_edit  });

    });

  }
  if ( type === 'maintenir'){

          connection.query(sql3,[ id_user ,id],  function(err, main_edit) {
            if (err) throw err;
            console.log(main_edit);
            res.render('edit.ejs', { type : type  ,  user:req.user ,id : req.query.id ,   main_edit:main_edit });

          });
          }

          if ( type === 'surveiller'){

            connection.query(sql4, [ id_user ,id],  function(err, sur_edit) {
              if (err) throw err;
              console.log('-----------------------------------------------------------------');
              console.log(sur_edit);
              res.render('edit.ejs', { type : type  ,   user:req.user ,id : req.query.id , sur_edit:sur_edit });

            }); 
            }
          
   


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
// console.log(req.body);







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
 app.get('/edit', isLoggedIn, function(req, res){
  res.render('edit.ejs', {
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