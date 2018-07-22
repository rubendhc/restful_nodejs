let userModel = {};


userModel.getUsers= (callback) => {
	if(global.conn){
		conn.query('SELECT * FROM users ORDER BY id', (err, rows) => {
			if(err) throw err;
			else{
				callback(null, rows);
			}
		});
	}
}

userModel.getUser = (userId, callback) => {
	if(global.conn){
		conn.query(`SELECT * FROM users WHERE id = ${userId}`, (err, rows) => {
			if(err) throw err;
			else{
				callback(null, rows);
			}
		});
	}
}
userModel.createUser = (userData, callback) => {
	if(global.conn){
		conn.query('INSERT INTO users SET ?', userData, (err, result) => {
			if(err) {
				throw err;
			}
			else{
				callback(null, result);
			}
		});
	}
}
/**/

userModel.updateUser = (id, userData, callback) => {

	const sql =
		`
			UPDATE users SET
			username = '${userData.username}',
			email = '${userData.email}',
			password = '${userData.password}'
			WHERE id = ${id}
		`;

	if(global.conn){
		conn.query(sql, (err, result) => {
			if(err) throw err;
			else{
				callback(null, result);
			}
		});
	}
}


userModel.  = (id,callback) => {
	if(global.conn){
		conn.query(`DELETE FROM users WHERE id = ${id}`, (err, result) => {
			if(err) throw err;
			else{
				callback(null, result);
			}
		});
	}
}


module.exports = userModel;