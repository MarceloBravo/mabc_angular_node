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
}
