const pantallasModel = require('../models/pantalla')
const checkToken = require('../shared/middlewares')

module.exports = function(app, passport){
    app.get('/pantallas/pag/:page', (req, res) => {
        pantallasModel.getPage(req.params.page, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.get('/pantallas/get/all',(req, res) => {
        pantallasModel.getAll((err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.get('/pantallas/:id', (req, res) => {
        pantallasModel.get(req.params.id, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });
    

    app.get('/pantallas/filtrar/:texto/:pag', (req, res) => {
        pantallasModel.filter(req.params.texto, req.params.pag, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.post('/pantallas', (req, res) => {
        pantallasModel.insert(req.body, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.put('/pantallas/:id', (req, res) => {
        pantallasModel.update(req.params.id, req.body, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });
    

    app.delete('/pantallas/:id', (req, res) => {
        pantallasModel.sofDelete(req.params.id, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.delete('/pantallas/kill/:id', (req, res) => {
        pantallasModel.delete(req.params.id, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });

}