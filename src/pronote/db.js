import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bestudying",
    port: 3307,
});

export function connect(){
    db.connect(function(err) {
        if (err) throw err;
        return multiQuery(
            'CREATE TABLE IF NOT EXISTS Adresses(id INTEGER UNIQUE NOT NULL AUTO_INCREMENT,adresse1 VARCHAR(256) NOT NULL,adresse2 VARCHAR(256) NOT NULL,adresse3 VARCHAR(256) NOT NULL,adresse4 VARCHAR(256) NOT NULL,cp VARCHAR(6) NOT NULL,ville VARCHAR(256) NOT NULL,province VARCHAR(256) NOT NULL,pays VARCHAR(256) NOT NULL,PRIMARY KEY (id));', 
            'CREATE TABLE IF NOT EXISTS Credentials(ine VARCHAR(11) NOT NULL UNIQUE,username VARCHAR(32) NOT NULL UNIQUE,password VARCHAR(32) NOT NULL,cas VARCHAR(32) NOT NULL,rne VARCHAR(8) NOT NULL);',
            'CREATE TABLE IF NOT EXISTS Users(ine VARCHAR(11) NOT NULL UNIQUE,nom VARCHAR(256) NOT NULL,prenom VARCHAR(256) NOT NULL,photo VARCHAR(2048) DEFAULT "https://i.imgur.com/tbvsqWK.png",tel VARCHAR(15) DEFAULT NULL,email VARCHAR(320) DEFAULT NULL,id_adresse INTEGER DEFAULT NULL,PRIMARY KEY (ine),FOREIGN KEY (ine) REFERENCES Credentials(ine),FOREIGN KEY (id_adresse) REFERENCES Adresses(id));',
            'CREATE TABLE IF NOT EXISTS Relations(first VARCHAR(11) NOT NULL UNIQUE,second VARCHAR(11) NOT NULL UNIQUE,timetable BIT DEFAULT 0,marks BIT DEFAULT 0,homeworks BIT DEFAULT 0,date DATETIME,PRIMARY KEY (first, second));',
            'CREATE TABLE IF NOT EXISTS Pendings(first VARCHAR(11) NOT NULL UNIQUE,second VARCHAR(11) NOT NULL UNIQUE,date DATETIME,PRIMARY KEY (first, second));',
        );
    });
    console.log("DB Connected")
}

export function query(query, values = []){
    db.query(query, [values], function(err, result){
        if(err) throw err;
        return result;
    });
    return null;
}

/**
 * @param {...string} queries 
 */
export function multiQuery(...queries){
    for(const q of queries) query(q);
}