const connection = require('../../db/connection.js')
const tools = require('../shared/tools.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const constantes = require('../shared/constants');

let cnn = connection.conect();

let login = {}

login.getUserData = async (credentials, callback) => {

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
        WHERE email = ${cnn.escape(credentials.email)}             
            AND deleted_at IS NULL `
        
        cnn.query(qry, (err, result) => {            
            let row = result[0]
            let access_token = null
            if(err){
                return callback(err, null)
            }else if(row === undefined){
                return callback({mensaje: 'Usuario inexistente.', tipo:'danger', id:-1})
            }else{
                bcrypt.compare(credentials.password.toString(), row.password.toString(), (err, res)=>{
                    if(err){
                        return callback(err, {access_token: null, user:null})
                    }else{
                        console.log('SECRET', constantes.secret);
                        access_token = jwt.sign({id: result.id}, constantes.secret, {issuer: credentials.host})    //Agregar datos al token: https://www.npmjs.com/package/jsonwebtoken
                        return callback(null,{access_token, user: row})
                    }
                })
            }
        })
            
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
    }
}

module.exports = login