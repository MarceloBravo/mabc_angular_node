const connection = require('../../db/connection')

let cnn = connection.conect()

module.exports = function todayToString(){
    let fecha = new Date();
    return `${fecha.getFullYear()}/${(fecha.getMonth() < 10 ? '0' : '')+fecha.getMonth()}/${(fecha.getDate() < 10 ? '0' : '') + fecha.getDate()}`;
}


module.exports = function rolesUsuario(idUser){
    if(cnn){
        let qry = `SELECT 
                    r.id, 
                    name, 
                    description, 
                    r.created_at, 
                    r.updated_at,
                    r.deleted_at 
                FROM 
                    role_user ru
                    INNER JOIN roles r ON ru.role_id = r.id
                WHERE 
                    ru.user_id = ${cnn.escape(idUser)}`;

        return new Promise((resolve, reject) => {
            cnn.query(qry, (err, res) => {
                if(err){
                    return resolve([]);
                }else{
                    return resolve(res);
                }
            });
        });
    }else{
        console.log('rolesUsuario','Conexión inactiva')
        return [];
    }
}