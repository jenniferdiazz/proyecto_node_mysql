
const express = require('express');
const morgan = require('morgan');
const path = require('path')
const  { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const { database } = require('./keys');
const { application } = require('express');


//initializations
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', engine({
    defaultLayout : 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', 'hbs');


//middlewares funciones que se ejecutan cada vez que un usuario envia una peticion al servidor
//ejemplo: morgan muestra por consola las peticiones que van llegand
app.use(session({
    secret:'proyecto_node',
    resave:false,
    saveUninitialized:false,
    store: new MySQLStore(database)
}))
 app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());

//global variables
app.use((req,res, next)=>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})



//public

app.use(express.static(path.join(__dirname, 'public')));



app.use(myconnection(mysql,database)) 

//routes: url del servidor
app.use(require('./routes'))
app.use(require('./routes/auth'))
app.use('/unidades',  require('./routes/unidades'))


//starting the server
app.listen(app.get('port'), ()=>{
    console.log('Server listening on port', app.get('port'));
})

app.get('/', (req, res)=>{
    res.render('home')
})