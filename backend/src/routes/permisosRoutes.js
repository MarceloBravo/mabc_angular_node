const permisosModel = require('../models/permisos');
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){

    app.get('/permisos/:id', checkToken, (req, res) => {
        permisosModel.get(req.params.id, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.post('/permisos', checkToken, (req, res) => {
        permisosModel.savePermissions(req.body, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });

}