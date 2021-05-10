const login = require('../models/login');

module.exports = function(app, passport){
    app.post('/login', (req, res) => {
        req.body.host = req.protocol + '://' + req.get('host') + '/login'
        login.getUserData(req.body, (err, data) => {
            if(err){
                res.status(403).json(err);
            }else{
                res.status(200).json(data);
            }
        })
    })
}