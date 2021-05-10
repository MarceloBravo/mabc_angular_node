const connection = require('../../db/connection.js')
const tools = require('../shared/tools.js')
const bcrypt = require('bcrypt');

let cnn = connection.conect();

let userModel = {}

userModel.get = (id, callback) => {
    if(cnn){
        let qry = `
        SELECT
            id,
            name,
            email, 
            password, 
            created_at, 
            updated_at, 
            a_paterno, 
            a_materno, 
            direccion, 
            foto
        FROM 
            users 
        WHERE id = ${cnn.escape(id)}
            AND deleted_at IS NULL
        `

        cnn.query(qry, (err, result) => {
            if(err){
                return callback(err, {mensaje: 'Ocurrió un error al solicitar los datos del registro.', tipoMensaje:'danger', id: id})
            }else{
                return callback(err, result)
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1})
    }
    
}

userModel.getAll = (callback) => {
    if(cnn){
        let qry = `SELECT 
                        name,
                        email, 
                        password, 
                        created_at, 
                        updated_at, 
                        a_paterno, 
                        a_materno, 
                        direccion, 
                        foto
                    FROM users 
                    WHERE deleted_at IS NULL 
                    ORDER BY id`;
                    
        cnn.query(qry,(err, rows) => {
            if(err){
                return callback(err, {mensaje: 'Ocurrió un error al solicitar los datos.', tipoMensaje:'danger', id: -1})
            }else{
                return callback(null, rows);
            }
        })
    }
}

userModel.insert = async (data, callback) => {
    if(cnn){
        let password = await tools.encriptarPassword(data.password)
        let today = new Date();
        let createdAt = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        let qry = `INSERT INTO users (
                        name,
                        email, 
                        password, 
                        created_at, 
                        updated_at, 
                        a_paterno, 
                        a_materno, 
                        direccion, 
                        foto
                    ) VALUES (
                        ${cnn.escape(data.name)}, 
                        ${cnn.escape(data.email)}, 
                        ${cnn.escape(password)},
                        ${cnn.escape(createdAt)}, 
                        ${cnn.escape(createdAt)}, 
                        ${cnn.escape(data.a_paterno)}, 
                        ${cnn.escape(data.a_materno)}, 
                        ${cnn.escape(data.direccion)}, 
                        ${cnn.escape(data.foto)}
                    )`
    
        cnn.query(qry, (err, result) => {
            if(err){
                console.log(err);
                msg = `Ocurrió un error al intentar insertar el nuevo usuario`
                tipo = 'danger'
                newId = null
            }else{
                msg = `El usuario ha sido insertado exitosamente.`
                tipo = 'success'
                newId = result.insertId
            }
    
            return callback(err, {mensaje: msg, tipoMensaje: tipo, id: newId});
            
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1})
    }
}


userModel.update = async (data, callback) => {
    if(cnn){
        let password = await tools.encriptarPassword(data.password)

        let today = new Date();
        let updateAt = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`

        let qry = `
            UPDATE users SET 
                name = ${cnn.escape(data.name)},
                email = ${cnn.escape(data.email)},
                password = ${cnn.escape(password)},
                updated_at = ${cnn.escape(updateAt)},
                a_paterno = ${cnn.escape(data.a_paterno)},
                a_materno = ${cnn.escape(data.a_materno)},
                direccion = ${cnn.escape(data.direccion)},
                foto = ${cnn.escape(data.foto)}
            WHERE id = ${cnn.escape(data.id)}
            `
            
        cnn.query(qry,(err, result) => {
            if(err){
                mensaje = 'Ha ocurrido un error al intentar actualizar el usuario.'
                tipo = 'danger'
                id = data.id
            }else{
                let exito = result.affectedRows > 0
                mensaje = exito ? 'El registro ha sido actualizado exitosamente.' : 'El registro no  fue encotrado o no existe.'
                tipo = exito ? 'success' : 'danger'
                id = data.id
            }
            return callback(err, {mensaje, tipoMensaje: tipo, id})
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1})
    }
}



userModel.delete = (data, callback) => {
    if(cnn){
        let qry =  `DELETE FROM users WHERE id = ${cnn.escape(data.id)}`
        cnn.query(qry, (err, result) => {
            if(err){
                mensaje = 'Ocurrio un error al intentar eliminar el registro.'
                tipo = 'danger'
                id = data.id
            }else{
                let exito = result.affectedRows > 0
                mensaje = exito ? 'El registro ha sido eliminado exitosamente.' : 'El registro no fue encontrado o no existe.'
                tipo = exito ? 'success' : 'danger'
                id = data.id
            }

            return callback(err, {mensaje, tipoMensaje: tipo, id})
        })
    }else{
        return callback({mensaje: 'Conexón inactiva.' , tipoMensaje: 'danger', id: -1})
    }
}


userModel.softDelete = (id, callback) =>  {
    if(cnn){
        let today = new Date();
        let deletedAt = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
        let qry = `
            UPDATE users SET 
                deleted_at = ${cnn.escape(deletedAt)} 
            WHERE id = ${cnn.escape(id)}
            `
        cnn.query(qry,(err, result) => {
            if(err){
                mensaje = 'Ha ocurrido un error al intentar eliminar el usuario.'
                tipo = 'danger'
            }else{
                console.log(result)
                let exito = result.affectedRows > 0
                mensaje = exito ? 'El registro ha sido eliminado exitosamente.' : 'El registro no  fue encotrado o no existe.'
                tipo = exito ? 'success' : 'danger'
            }
            return callback(err, {mensaje, tipoMensaje: tipo, id})
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id: -1})
    }
}

/*
const encriptarPassword = async (pwd) => {
    const saltRounds = 10;
    let password = await bcrypt.hash(pwd, saltRounds).then(function(hash) {
        return hash
    });    

    return password
}
*/

module.exports = userModel;