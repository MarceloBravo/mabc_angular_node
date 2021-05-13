const menusModel = require('../models/menus');
const mw = require('../shared/middlewares.js');

module.exports = function(app, passport){
    app.get('/menus/rol/:idRol', mw.checkToken, (req, res) => {
        menusModel.mainMenu(req.params.idRol,(err, data) => {
            if(err){
                res.json(err);
            }else{
                res.status(200).json(data);
            }
        });
    });

    app.get('/menus/pag/:pag', mw.checkToken, (req, res) => {
        menusModel.getPage(req.params.pag,(err, data) => {
            if(err){
                res.json(err);
            }else{
                res.status(200).json(data);
            }
        });
    });

    app.get('/menus/filtrar/:texto/:pag', mw.checkToken, (req, res) => {
        menusModel.filter(req.params.texto, req.params.pag, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.status(200).json({data: data});
            }
        });
    });

    app.get('/menus/:id', mw.checkToken, (req, res) => {
        menusModel.get(req.params.id, (err, data) => {
            if(err){
                res.json(data);
            }else{
                res.status(200).json(data);
            }
        });

    });

    app.get('/menus/get/all', mw.checkToken, (req, res) => {
        menusModel.getAll((err, data) => {
            if(err){
                res.json(data);
            }else{
                res.status(200).json(data);
            }
        });

    });

    app.post('/menus', mw.checkToken, (req,res) => {
        menusModel.insert(req.body,(err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.put('/menus/:id', mw.checkToken, (req,res) => {
        let id = req.params.id;
        menusModel.update(id, req.body,(err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.delete('/menus/:id', mw.checkToken, (req,res) => {
        let id = req.params.id;
        menusModel.softDelete(id,(err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.delete('/menus/kill/:id', mw.checkToken, (req,res) => {
        let id = req.params.id;
        menusModel.delete(id,(err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });
}