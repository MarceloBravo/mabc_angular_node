const configModel = require('../models/config');
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){
    app.get('/config',(req, res) => {
        configModel.getData((err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.post('/config', checkToken, (req, res) => {
        configModel.save(req.body, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });
}
