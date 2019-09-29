exports.Forgot = (req, res, next)=>{
    console.log(req.body);
    knex('user').where('email', req.body.email).select('*')
    .then((result) =>{
        if(result.length == 0){
            resp.Success(res, 'User not registered', 'failed')
        }else{
            resp.Success(res, result[0].full_name)
        }
    })
    .catch((err) => {
        console.log(err)
        resp.Failed(res, 'Internal Server Error')
    });
}