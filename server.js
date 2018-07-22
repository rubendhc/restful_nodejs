//Modulos build-in
const express = require("express");//Incluye a express
const bodyParser = require("body-parser");//Incluye body-parser 
const app = express(); //Asigna express() a una constante 
const morgan = require("morgan");

//Own modules

///Routes
const router = require("./app/routes/userRoutes.js");

///DataBase Modules
const mysqlConfig = require("./config/database.config.js");
const mysql = require("mysql");




//Midleware
app.use(bodyParser.urlencoded({extended:true}));  //For ontent-type - application/x-www-form-urlencoded
app.use(bodyParser.json());//For content-type - application/json
app.use(morgan('dev'));//Para ver en la terminal las peticiones


///settings
conn = mysql.createConnection( mysqlConfig.dbConfig );
app.set('port', process.env.PORT || 3000);

conn.connect( (err) => {
	if(err) throw err;
	console.log('Connected to mysql');
});


//routes
app.use(router);



//Server run
app.listen(app.get('port'), ()=>{
	console.log('Server running a localhost:'+app.get('port'));
});