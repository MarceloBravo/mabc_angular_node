const secret = require('../shared/constants');
const jwt = require('jsonwebtoken');

let middlewares = {}

middlewares.checkToken = async (req, res, next) => {
    try{
        const bearerHeader = req.headers['authorization'];
        if(bearerHeader){
            let token = bearerHeader.split(" ")[1];
            req.token = token;
            let verified = jwt.verify(token, secret)
            if(verified){
                next();
            }else{
                res.sendStatus(403);
            }
        }else{
            res.status(403).send('Autorización no válida.');
        }
    }catch(error){  
        res.status(400).send('Token no válido');
    }
}

module.exports = middlewares
