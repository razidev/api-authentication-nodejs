const jwt = require('jsonwebtoken'),
config = require('../middleware/config')
redis = require('redis'),
serverRedis = redis.createClient(`redis://${config.redisLocal}`),
resp = require('../middleware/response-status'),
bcrypt = require("bcrypt");

exports.Login = (req, res, next)=>{
    knex('user').where('email', req.body.email).select('*')
    .then((result) =>{
        if(result.length == 0){
            resp.Success(res, 'User not registered', 'failed')
        }else{
            bcrypt.compare(req.body.password, result[0].password, (err, match) => {
                if (match) {
                    var random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    let params = {
                        user_id: result[0].id,
                        email: req.body.email,
                        phone_number: result[0].phone_number,
                        full_name: result[0].full_name,
                        username: result[0].username,
                        age: result[0].age,
                        secret_key: random
                    }
                    resp.Success(res, params)
                    let setValue = [
                        "email", req.body.email, "password", result[0].password, "join_date", result[0].join_date, 
                        "phone_number", result[0].phone_number, "full_name", result[0].full_name, "username", 
                        result[0].username, "age", result[0].age, "active", result[0].active, "id", result[0].id
                    ];
                    serverRedis.select(1, (err, db) => {})
                    serverRedis.hmset(req.body.email, setValue, (err, userData) => {});
                    serverRedis.save();
                }else{
                    resp.Success(res, 'Wrong password', 'failed')
                }
            })
        }
    })
    .catch((err) => {
        console.log(err)
        resp.Failed(res, 'Internal Server Error')
    });
};