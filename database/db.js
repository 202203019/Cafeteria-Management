const Pool=require('pg').Pool;

const pool=new Pool({
    user:'postgres',
    password: 'Ganesha#1705',
    host:'localhost',
    database:'MyCafe',
    port: 5432
});

module.exports=pool;