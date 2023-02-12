import mysql from 'mysql';

const db = mysql.createConnection({
    host: "37.187.37.122",
    user: "admin",
    password: "NyrokGames75",
    database: "promate",
    port: 3306,
});

export async function connect(){
    db.connect(function(err) {
        if (err) throw err;
        multiQuery(
            'CREATE TABLE IF NOT EXISTS Adresses(ine VARCHAR(11) NOT NULL UNIQUE,adresse1 VARCHAR(256) NOT NULL,adresse2 VARCHAR(256) NOT NULL,adresse3 VARCHAR(256) NOT NULL,adresse4 VARCHAR(256) NOT NULL,codePostal VARCHAR(6) NOT NULL,ville VARCHAR(256) NOT NULL,province VARCHAR(256) NOT NULL,pays VARCHAR(256) NOT NULL,PRIMARY KEY (ine));',
            'CREATE TABLE IF NOT EXISTS Credentials(ine VARCHAR(11) NOT NULL UNIQUE,username VARCHAR(32) NOT NULL UNIQUE,password VARCHAR(32) NOT NULL,cas VARCHAR(32) NOT NULL,rne VARCHAR(8) NOT NULL);',
            'CREATE TABLE IF NOT EXISTS Users(ine VARCHAR(11) NOT NULL UNIQUE,nom_prenom VARCHAR(256) NOT NULL,photo VARCHAR(2048) DEFAULT "https://i.imgur.com/tbvsqWK.png",tel VARCHAR(15) DEFAULT NULL,email VARCHAR(320) DEFAULT NULL,PRIMARY KEY (ine));',
            'CREATE TABLE IF NOT EXISTS Relations(first VARCHAR(11) NOT NULL UNIQUE,second VARCHAR(11) NOT NULL UNIQUE,date DATETIME,PRIMARY KEY (first, second));',
            'CREATE TABLE IF NOT EXISTS Pendings(first VARCHAR(11) NOT NULL UNIQUE,second VARCHAR(11) NOT NULL UNIQUE,date DATETIME,PRIMARY KEY (first, second));',
        );
        console.log("DB Connected");
    });
} 

/**
 * @param {string} query 
 * @param {function(*): *} callback
 * @param {Array} values 
 * @returns {Array}
 */
export async function query(query, callback = undefined, values = []){
    return await db.query(query, [values], function(err, results){
        if(err) throw err;
        if(callback) return callback(results);
    });
}

/**
 * @param {...string} queries 
 * @returns {Array}
 */
export async function multiQuery(...queries){ 
    for(const q of queries) query(q);
}