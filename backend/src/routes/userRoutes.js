const userModel = require('../models/user.js');
const checkToken = require('../shared/middlewares.js');

module.exports = function (app, passport){
    app.get('/usuarios', checkToken, (req, res) => {
        userModel.getAll((err, data) => {
            res.status(200).json(data);
        });
    });

    app.get('/usuarios/:id', (req, res) => {
        let id = req.params.id
        userModel.get(id, (err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/usuarios', (req, res) => {
        if(validaDatos(req.body)){
            userModel.insert(req.body, (err, data)  => {
                res.json({err,data});
            });
        }else{
            res.json({mensaje: 'Datos incompletos o no válidos.', tipoMensaje: 'danger', id: -1})
        }
    });

    app.put('/usuarios/:id', (req, res) => {
        if(validaDatos(req.body)){
            userModel.update(req.body, (err, data) => {
                res.json({err,data})
            })
        }else{
            res.json({mensaje: 'Datos incompletos o no válidos.', tipoMensaje: 'danger', id: -1})
        }
    })

    app.delete('/usuarios/:id', (req, res) => {
        let id = req.params.id
        userModel.softDelete(id, (err, data) => {
            res.json({err, data})
        })
    })

    app.delete('/usuarios/kill/:id', (req, res) => {
        let id = req.params.id
        userModel.delete(id, (err, data) => {
            res.json({err, data})
        })
    })
}

const validaDatos = (data) => {
    return true
}


