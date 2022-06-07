const { Result } = require('express-validator');
const { ResultWithContext } = require('express-validator/src/chain');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helpers = require('../lib/helpers');
const util = require('util');
const pool = require('../database');
const emailer = require ('../lib/emailer')

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true

}, async(req, username, password, done)=>{
  console.log(req.body)
  const rows = await pool.query('SELECT * FROM users WHERE username =?',[username]);
  if(rows.length > 0 ){
    console.log(rows[0])
    const user= rows[0];
    const validPassword = await helpers.matchPassword(password, user.password);
    if(validPassword){
      done(null, user, req.flash('success', 'Bienvenida '+ user.username));
    }else{
      done(null, false, req.flash('message','Contraseña invalida'))
    } 
  }else{
    return done(null,false,req.flash('message','El usuario no existe'));
  }
}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField:'password',
    passReqToCallback: true
}, async(req, username, password, done)=>{


    const { fullname } = req.body
    const { email } = req.body
  


    const newUser={
        username,
        password,
        fullname,
        email

    };



    newUser.password = await helpers.encryptPassword(password);
    
    const pool_getConnection = util.promisify(req.getConnection);
    let conn = await pool_getConnection();



       const query = util.promisify(conn.query.bind(conn))
       result = await query('INSERT INTO users SET ?', [newUser])
 
       newUser.id = result.insertId;
       emailer.sendMail(newUser)
  

       return done(null, newUser)
    

     
    // })

 

}));

passport.serializeUser((user, done)=>{


    done(null, user.id );
});
passport.deserializeUser(async(id, done)=>{

  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
})