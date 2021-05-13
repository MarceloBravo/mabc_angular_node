module.exports = function todayToString(){
    let fecha = new Date();
    return `${fecha.getFullYear()}/${(fecha.getMonth() < 10 ? '0' : '')+fecha.getMonth()}/${(fecha.getDate() < 10 ? '0' : '') + fecha.getDate()}`;
}