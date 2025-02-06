var express = require('express');
var cors = require('cors');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
});

var app = express();
app.use(cors());
app.use(express.json());

app.listen(5000,function(){
    console.log('CORS-enable web server listening on port 5000');
});

app.get('/users', function(req,res,next){
    connection.query(
        'SELECT * FROM users',
        function(err, results, fields){
            res.status(200).json(results);
        }
    );
});



app.get('/users/:id', function(req,res,next){
    const id = req.params.id;
    connection.query(
        'SELECT * FROM users WHERE id=?',
        [id],
        function(err, results, fields){
            res.status(200).json(results);
        }
    );
}
);


app.post('/users/create', function(req,res,next){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const password = req.body.password;
    const avatar = req.body.avatar;
    connection.query(
        'INSERT INTO  users (fname,lname,username,password,avatar) VALUES (?,?,?,?,?)',
        [fname,lname,username,password,avatar],
        function(err, results, fields){
            res.status(200).json(results);
        }
    );
}
);

app.put('/users/update', function(req,res,next){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const password = req.body.password;
    const avatar = req.body.avatar;
    const id = req.body.id;
    connection.query(
        'UPDATE  users SET (fname=?,lname=?,username=?,password=?,avatar=?) WHERE id=?',
        [fname,lname,username,password,avatar,id],
        function(err, results, fields){
            res.status(200).json(results);
        }
    );
}
);

app.delete('/users/delete', function(req,res,next){
    const id = req.body.id;
    connection.query(
        'DELETE FROM  users WHERE id=?',
        [id],
        function(err, results, fields){
            res.status(200).json(results);
        }
    );
}
);