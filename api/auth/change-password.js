const bcrypt = require("bcrypt"),
resp = require('../middleware/response-status'),
config = require('../middleware/config'),
redis = require('redis'),
serverRedis = redis.createClient(`redis://${config.redisLocal}`);

exports.Change = (req, res, next) => {
    bcrypt.hash(req.body.conf_password, 10, (err, hash)=>{
        // console.log(hash)
        knex('user').where('email', req.body.email).update({password: hash})
        .then((result)=>{
            resp.Success(res, 'Password updated')
            let password = ["password", hash]
            serverRedis.select(1, (err, db) => {})
            serverRedis.hmset(req.body.email, password, (err, userData) => {});
            serverRedis.save();
        })
        .catch((err)=>{
            // console.log(err)
            resp.Failed(res, 'Internal Server Error')
        })
    })
    
}