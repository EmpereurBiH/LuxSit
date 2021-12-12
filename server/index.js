const express = require('express');
//bodyparser is deprecated
const cors = require('cors')
const app = express ();
const mysql = require('mysql');
//"npm run devStart" to star server side
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Password@123",
    database: "LuxSitDataBase"
});

//replacing bodyparser
app.use (cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/api/get/players", (req,res)=> {
    const sqlSelectPlayers = 
        "SELECT * FROM players";
    db.query(sqlSelectPlayers, (err, result) => {
    console.log(result);
    res.send(result)
    console.log(err);
    });
});

app.get("/api/get/armordetails", (req,res)=> {
    const idarmor = req.query.idarmor;
    console.log ("req.params" + idarmor);
    const sqlSelectArmorDetails = 
        "SELECT * FROM armors WHERE idarmor = ?";
    console.log (sqlSelectArmorDetails);   
    db.query(sqlSelectArmorDetails, idarmor, (err, result) => {
    console.log(result);
    res.send(result)
    console.log(err);
    });
});


app.get("/api/get/armors", (req,res)=> {
    const sqlSelectArmors = 
        "SELECT * FROM armors";
    db.query(sqlSelectArmors, (err, result) => {
    console.log(result);
    res.send(result)
    console.log(err);
    });
});

app.post("/api/insert", (req, res) => {
    const playerName = req.body.playerName;
    const playerPassword = req.body.playerPassword;

    const sqlInsert = 
        "INSERT INTO players (playerName, playerPassword) VALUES (?,?)";
    db.query(sqlInsert,[playerName, playerPassword], (err, result) => {
    console.log(result);
    console.log(err);
    });
});

app.post("/api/insert/armor", (req, res) => {
    const armorName = req.body.armorName;
    const armorDescription = req.body.armorDescription;
    const armorDEF = req.body.armorDEF;
    const armorKBR = req.body.armorKBR;
    const armorSB = req.body.armorSB;
    const armorWeight = req.body.armorWeight;
    const armorLCK = req.body.armorLCK;
    const sqlInsert = 
        "INSERT INTO armors (armorName, armorDescription, armorDEF, armorKBR, armorSB, armorWeight, armorLCK) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlInsert,[armorName, armorDescription, armorDEF, armorKBR, armorSB, armorWeight, armorLCK], (err, result) => {
    console.log(result);
    console.log(err);
    });
});

app.delete("/api/delete/:playerName", (req, res) => {
    const name = req.params.playerName;
    const sqlDelete = 
    "DELETE FROM players WHERE playerName = ?";

    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err);
    });
});

app.delete("/api/deleteArmor/:armorID", (req, res) => {
    const armorID = req.params.armorID;
    const sqlDeleteArmor = 
    "DELETE FROM armors WHERE idarmor = ?";

    db.query(sqlDeleteArmor, armorID, (err, result) => {
        if (err) console.log(err);
    });
});

app.put("/api/update", (req, res) => {
    const playerName = req.body.playerName;
    const playerPassword = req.body.playerPassword;
    const sqlUpdate = 
    "UPDATE players SET playerPassword = ? WHERE playerName = ?";
    db.query(sqlUpdate, [playerPassword,playerName], (err, result) => {
        if (err) console.log(err);
    });
});

app.put("/api/update/armor/:armorID", (req, res) => {
    var param = [
    req.body,
    req.params.armorID
    ];
    console.log(req.body);
    console.log (req.params);
    const sqlUpdateArmor = 
    "UPDATE armors SET ? WHERE idarmor = ?";
    db.query(sqlUpdateArmor, param, function (err, result) {
        res.redirect('/armors');
        if (err) console.log(err);
    });
});

//Enemy

app.get("/api/get/enemies", (req,res)=> {
    const sqlSelectEnemies = 
        "SELECT * FROM enemies";
    db.query(sqlSelectEnemies, (err, result) => {
    console.log(result);
    res.send(result)
    console.log(err);
    });
});

app.get("/api/get/enemydetails", (req,res)=> {
    const idenemy = req.query.idenemy;
    console.log ("req.params" + idenemy);
    const sqlSelectEnemyDetails = 
        "SELECT * FROM enemies WHERE idenemy = ?";
    console.log (sqlSelectEnemyDetails);   
    db.query(sqlSelectEnemyDetails, idenemy, (err, result) => {
    console.log(result);
    res.send(result)
    console.log(err);
    });
});


app.put("/api/update/enemy/:enemyID", (req, res) => {
    var param = [
    req.body,
    req.params.enemyID
    ];
    console.log(req.body);
    console.log (req.params);
    const sqlUpdateEnemy = 
    "UPDATE enemies SET ? WHERE idenemy = ?";
    db.query(sqlUpdateEnemy, param, function (err, result) {
        res.redirect('/enemies');
        if (err) console.log(err);
    });
});

app.post("/api/insert/enemy", (req, res) => {
    const enemyName = req.body.enemyName;
    const enemyDescription = req.body.enemyDescription;
    const enemyHP = req.body.enemyHP;
    const enemyDEF = req.body.enemyDEF;
    const enemyAgility = req.body.enemyAgility;
    const enemyAttack = req.body.enemyAttack;
    const enemyMagic = req.body.enemyMagic;
    const enemyType = req.body.enemyType;
    const sqlInsert = 
        "INSERT INTO enemies (enemyName, enemyDescription, enemyHP, enemyDEF, enemyAgility, enemyAttack, enemyMagic, enemyType ) VALUES (?,?,?,?,?,?,?,?)";
    db.query(sqlInsert,[enemyName, enemyDescription, enemyHP, enemyDEF, enemyAgility, enemyAttack, enemyMagic, enemyType], (err, result) => {
    console.log(result);
    console.log(err);
    });
});

app.delete("/api/deleteEnemy/:enemyID", (req, res) => {
    const enemyID = req.params.enemyID;
    const sqlDeleteEnemy = 
    "DELETE FROM enemies WHERE idenemy = ?";

    db.query(sqlDeleteEnemy, enemyID, (err, result) => {
        if (err) console.log(err);
    });
});

//Weapons//////

app.get("/api/get/weapons", (req,res)=> {
    const sqlSelectWeapons = 
        "SELECT * FROM weapons";
    db.query(sqlSelectWeapons, (err, result) => {
    console.log(result);
    res.send(result)
    console.log(err);
    });
});

app.get("/api/get/weapondetails", (req,res)=> {
    const idweapon = req.query.idweapon;
    console.log ("req.params" + idweapon);
    const sqlSelectWeaponDetails = 
        "SELECT * FROM weapons WHERE idweapon = ?";
    console.log (sqlSelectWeaponDetails);   
    db.query(sqlSelectWeaponDetails, idweapon, (err, result) => {
    console.log(result);
    res.send(result)
    console.log(err);
    });
});


app.put("/api/update/weapon/:weaponID", (req, res) => {
    var param = [
    req.body,
    req.params.weaponID
    ];
    console.log(req.body);
    console.log (req.params);
    const sqlUpdateWeapon = 
    "UPDATE weapons SET ? WHERE idweapon = ?";
    db.query(sqlUpdateWeapon, param, function (err, result) {
        res.redirect('/Weapons');
        if (err) console.log(err);
    });
});

app.post("/api/insert/weapon", (req, res) => {
    const weaponName = req.body.weaponName;
    const weaponDescription = req.body.weaponDescription;
    const weaponDMG = req.body.weaponDMG;
    const weaponKB = req.body.weaponKB;
    const weaponAS = req.body.weaponAS;
    const weaponSB = req.body.weaponSB;
    const weaponWeight = req.body.weaponWeight;
    const weaponLCK = req.body.weaponLCK;
    const sqlInsert = 
        "INSERT INTO weapons (weaponName, weaponDescription, weaponDMG, weaponKB, weaponAS, weaponSB, weaponWeight, weaponLCK ) VALUES (?,?,?,?,?,?,?,?)";
    db.query(sqlInsert,[weaponName, weaponDescription, weaponDMG, weaponKB, weaponAS, weaponSB, weaponWeight, weaponLCK], (err, result) => {
    console.log(result);
    console.log(err);
    });
});

app.delete("/api/deleteWeapon/:weaponID", (req, res) => {
    const weaponID = req.params.weaponID;
    const sqlDeleteWeapon = 
    "DELETE FROM weapons WHERE idweapon = ?";

    db.query(sqlDeleteWeapon, weaponID, (err, result) => {
        if (err) console.log(err);
    });
});


app.listen(3001, () => {
    console.log("Running on port 3001");
});