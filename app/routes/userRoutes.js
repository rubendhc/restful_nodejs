const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get('/', (request, response)=>{
  response.json([{"Esto":"Está genial"}]);
});

router.get('/v1/api/users', (request, response) => {
	//response.json({"Otra":"Prueba genial"});
	User.getUsers((err,data)=>{
		response.json(data);
	})
});

router.get('/v1/api/users/:userId', (request, response) => {
	User.getUser(request.params.userId, (err, data)=> {
		if(err) throw err;
		else{
			response.json(data);
		}
	});
});

router.post('/v1/api/users', (request, response) => {
	const userData = { 
		username: request.body.username,
		email: request.body.email,
		password: request.body.password 
	}

	if(userData.username && userData.email && userData.password){
		User.createUser(userData, (err, data) => {
			if(data){
				response.json([{"process":"okay", data}]);
			}else{
				response.json({"process":"error"});
			}
		}); 
	}else{
		response.json({"message":"Some value is null"});
	}
});


router.put('/v1/api/users/:id', (request, response) => {
	const userData = {
		username : request.body.username,
		email : request.body.email,
		password : request.body.password
	}

	if(userData){
		User.updateUser(request.params.id, userData, (err, data)=>{
			if(data){
				response.json({"process": "correct", data});
			}else{
				response.json({"process": "error"});
			}
		});
	}

});


router.delete('/v1/api/users/:id', (request, response) => {
	User.deleteUser(request.params.id, (err, data) => {
		if(data){
			response.json({"process":"okay", data});
		}else{
			response.json({"process": "error", data});
		}
	});
});




module.exports = router;