const bcrypt = require("bcrypt"),
resp = require('../middleware/response-status'),
config = require('../middleware/config'),
redis = require('redis'),
serverRedis = redis.createClient(`redis://${config.redisLocal}`);

exports.Change = (req, res, next) => {
    knex('user').where('email', req.body.email).select('*')
    .then((result) =>{
        bcrypt.compare(req.body.password.old_password, result[0].password, (err, match) => {
            if (match) {
                bcrypt.hash(req.body.password.conf_password, 10, (err, hash)=>{
                    knex('user').where('email', req.body.email)
                    .update({password: hash})
                    .then(updated => {
                        // console.log('updated ? ', updated, hash)
                        resp.Success(res, 'Password updated');
                        let password = ["password", hash]
                        serverRedis.select(1);
                        serverRedis.hmset(req.body.email, password)
                        serverRedis.save()
                    })
                    .catch(error=>{
                        // console.log('errr ', error)
                        resp.Failed(res, 'Internal Server Error')
                    })
                })
            } else {
                resp.Success(res, 'Wrong old password', 'failed')
            }
        })
    })
}