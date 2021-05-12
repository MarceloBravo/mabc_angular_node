const connection = require('../../db/connection.js');
const tools = require('../shared/tools.js');

let cnn = connection.conect();

let menusModel = {};

// ******************* MENÚ DEL ESCRITORIO DE LA APLICACIÓN *******************
//Retorna el menú principal de la aplicación
menusModel.menu = (idRol, callback) => {
    if(cnn){
        let qry =  `
            SELECT 
                mnu.id,
                mnu.nombre,
                mnu.url,
                mnu.menu_padre_id,
                mnu.posicion, 
                CASE mnu.menu_padre_id WHEN 0 THEN mnu.id ELSE mnu.menu_padre_id END AS sub_menu 
            FROM (
            SELECT 
                m.id,
                m.nombre,
                m.url,
                m.menu_padre_id,
                m.posicion 
            FROM 
                menus m
            WHERE menu_padre_id = 0 
                
            UNION ALL
            
            SELECT 
                m.id,
                m.nombre,
                m.url,
                m.menu_padre_id,
                m.posicion
            FROM 
                menus m
                INNER JOIN pantallas p ON m.id = p.menus_id 
                INNER JOIN permisos pr ON p.id = pr.pantallas_id 
            WHERE 
                m.deleted_at IS NULL AND 
                roles_id = ${cnn.escape(idRol)}
            ) as mnu
            ORDER BY sub_menu desc, url, posicion
        `;

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: err.message, tipoMensaje:'danger', id:-1, errores: err});        
            }else{
                return callback(err, res);
            }
        });
    }else{
        return callback({mensaje:'Conexión inactiva.', tipoMensaje:'danger', id:-1});
    }
}


menusModel.mainMenu = (idRol, callback) => {
    if(cnn){
        let qry = `
            SELECT
                m.id,
                m.nombre,
                m.url,
                m.menu_padre_id,
                m.posicion
            FROM
                menus m
            WHERE 
                menu_padre_id = 0 
                -- AND roles_id = ${cnn.escape(idRol)}
            ORDER BY 
                posicion
            `;

            cnn.query(qry, async (err, res) => {
                if(err){
                    return callback({mensaje: err.message, tipoMensaje: 'danger', id: -1, errores: err})
                }else{
                    let menu = res
                    for(var x=0; x < menu.length; x++){
                        sub = await subMenus(menu[x].id, idRol)
                        menu[x]['sub_menu'] = sub
                    }
                    return callback(err, menu);
                }
            })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1});
    }
}


function subMenus(idMenuPadre, idRol){
    let qry = `
            SELECT 
                m.id,
                m.nombre,
                m.url,
                m.menu_padre_id,
                m.posicion
            FROM 
                menus m
                INNER JOIN pantallas p ON m.id = p.menus_id 
                INNER JOIN permisos pr ON p.id = pr.pantallas_id 
            WHERE 
                m.deleted_at IS NULL AND 
                menu_padre_id = ${cnn.escape(idMenuPadre)} AND 
                roles_id = ${cnn.escape(idRol)}
            ORDER BY posicion
            `;

        return new Promise((resolve, reject) => {
            cnn.query(qry, (err, res) => {
                if(err){
                    return reject(err)
                }else{
                    return resolve(res)
                }
            })
        });
}
// ******************* FIN MENÚ DEL ESCRITORIO DE LA APLICACIÓN *******************


// ******************* MANTENEDOR DE MENÚ *******************
menusModel.get = (id, callback) => {
    if(cnn){
        let qry = `
            SELECT 
                m.id,
                m.nombre,
                m.url,
                m.menu_padre_id,
                m.posicion,
                creted_at,
                updated_at 
            FROM 
                menus m
            WHERE 
                deleted_at IS NULL AND 
                id = ${cnn.escape(id)}
        `;

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: err.message, tipoMensaje: 'danger', id: -1});
            }else{
                return callback(err, res);
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1});
    }

}


menusModel.getAll = (callback) => {
    if(cnn){
        let qry = `
            SELECT 
                m.id,
                m.nombre,
                m.url,
                m.menu_padre_id,
                m.posicion,
                creted_at,
                updated_at 
            FROM 
                menus m
            WHERE deleted_at IS NULL
        `;

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: err.message, tipoMensaje: 'danger', id: -1});
            }else{
                return callback(err, res);
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1});
    }
}
// ******************* FIN MANTENEDOR DE MENÚ *******************

module.exports = menusModel;


