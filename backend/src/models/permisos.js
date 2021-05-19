const connection = require('../../db/connection');

let cnn = connection.conect();

let permisosModel = {};

permisosModel.get = async (idRol, callback) => {
    if(cnn){
        try{
            let qry = `
                    SELECT
                        qry1.id,
                        -- r.id AS rol_id,
                        qry1.roles_id,
                        pt.id AS pantallas_id,
                        pt.nombre AS pantalla,
                        pt.permite_crear,
                        pt.permite_modificar,
                        pt.permite_eliminar,
                        qry1.acceder,
                        qry1.crear,
                        qry1.modificar,
                        qry1.eliminar,
                        qry1.created_at,
                        qry1.updated_at,
                        qry1.deleted_at
                FROM pantallas pt
                LEFT JOIN 
                (	SELECT p.* FROM permisos p 
                    INNER JOIN roles r ON p.roles_id = r.id AND r.id = ${cnn.escape(idRol)} 
                ) qry1 ON pt.id = qry1.pantallas_id 
                WHERE
                        pt.deleted_at IS NULL AND
                        qry1.deleted_at IS NULL
                ORDER BY
                        roles_id,
                        pantallas_id`;
            console.log(qry);
            let res = await cnn.promise().query(qry);

            return callback(null, res[0]);
        }catch(error){
            console.log(error)
            return callback({mensaje: 'Ocurrió un error al buscar los permisos del rol: '+ error.message, tipoMensaje: 'danger', id: -1});
        }
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1});
    }
}

permisosModel.savePermissions = async (data, callback) => {
    if(cnn){
        try{
            await cnn.promise().beginTransaction();
            await deletePermissions(data.id, data.permisos);
            await insertPermissions(data.id, data.permisos);
            await updatePermissions(data.id, data.permisos);
            await cnn.promise().commit();

            return callback({mensaje: 'Los permisos han sido actualizados.', tipoMensaje: 'success', id: -1});
        }catch(error){
            console.log(error)
            await cnn.promise().rollback();
            return callback({mensaje: 'Ocurrió un error al intentar registrar los permisos: '+error.message, tipoMensaje: 'danger', id: -1});
        }
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1});
    }
}

const insertPermissions = async (idRol, data) => {
    data.filter(p => p.id === null).forEach(async p => {
        var qry = `
            INSERT INTO permisos (
                roles_id,
                pantallas_id,
                acceder,
                crear,
                modificar,
                eliminar,
                created_at,
                updated_at
            ) VALUE (
                ${cnn.escape(idRol)},
                ${cnn.escape(p.pantallas_id)},
                ${cnn.escape(p.acceder)},
                ${cnn.escape(p.crear)},
                ${cnn.escape(p.modificar)},
                ${cnn.escape(p.eliminar)},
                CURDATE(),
                CURDATE()
            )`;

        await cnn.promise().query(qry);
    });
}

const updatePermissions = async (idRol, data) => {
    data.filter(p => p.id !== null).forEach(async p => {
        var qry = `
        UPDATE permisos SET 
            roles_id = ${cnn.escape(idRol)}, 
            pantallas_id = ${cnn.escape(p.pantallas_id)},
            acceder = ${cnn.escape(p.acceder)},
            crear = ${cnn.escape(p.crear)},
            modificar = ${cnn.escape(p.modificar)},
            eliminar = ${cnn.escape(p.eliminar)},
            updated_at = CURDATE()
        WHERE id = ${p.id}`;
        await cnn.promise().query(qry);
    });
}


const deletePermissions = async (idRol, data) => {
    let ids = data.filter(p => p.id !== null).map(p => p.id);
    let qry = `
            DELETE FROM 
                permisos 
            WHERE 
                roles_id = ${cnn.escape(idRol)} AND 
                id NOT IN (${ids})
            `;
    
    if(ids.length > 0){
        await cnn.promise().query(qry);
    }
}


module.exports = permisosModel;