const login = require('../models/login');

module.exports = function(app, passport){
    app.post('/login', (req, res) => {
        req.body.host = req.protocol + '://' + req.get('host') + '/login'   //Obteniendo la url para adjuntarla al token a devolver
        login.getUserData(req.body, (err, data) => {
            if(err){
                res.status(403).json(err);
            }else{
                res.status(200).json(data);
            }
        });
    });


    app.post('/logout', (req, res) => {
        const bearerHeader = req.headers['authorization'];
        console.log(bearerHeader)
        /*
        login.logout((err, data) => {
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        });
        */
    });
}