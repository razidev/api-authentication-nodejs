const config = require('../middleware/config')
resp = require('../middleware/response-status'),
knex = require('knex')({
  client: 'mysql',
  connection: {
    host : config.db_host,
    user : config.db_user,
    password : '',
    database : config.db_name
  }
});

exports.Register = (req, res, next)=>{
    knex('user').where('email', req.body.email).select('email')
    .then((result) =>{
      if(result.length >= 1){
        resp.Success(res, 'Your account already registered', 'failed')
      }else{
        knex('user').insert({email: req.body.email, password: req.body.data.password, join_date: req.body.data.join_date, 
          phone_number: req.body.data.phone_number, full_name: req.body.data.full_name, username: req.body.data.username,
          age: req.body.data.age})
        .then((rst) =>{
          resp.Create(res, 'Your account succesfuly registered', {active: 1, user_id: rst[0]})
        }).catch((err) => {
            console.log('err ', err);
            resp.Failed(res, 'Internal Server Error')
        });
      }
    }).catch((err) => {
        resp.Failed(res, 'Internal Server Error')
    });
};