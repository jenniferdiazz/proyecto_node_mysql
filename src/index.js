
const express = require('express');
const morgan = require('morgan');
const path = require('path')
const  { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');


//initializations
const app = express();

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())
//global variables
app.use((req,res, next)=>{
next();
})



//public

app.use(express.static(path.join(__dirname, 'public')));




app.use(myconnection(mysql,{
    host:'localhost',
    user:'root',
    password:'admin',
    port:3306,
    database:'base_acond'
})) 

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