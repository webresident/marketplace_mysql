import express, { json } from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "TestDB123",
    database: "marketplace_db"
});

app.use(express.json());
app.use(cors());


function getTableByRole(role){
    let tableName;
    switch(role){
        case "client":
            tableName = "clients";
            break;
        case "supplier":
            tableName = "suppliers";
            break;
        case "admin":
            tableName = "admins";
            break;
        default:
            tableName = "";
        break;
    }
    return tableName;
}

app.get("/verify-register", (req, res) => {
    let tableName = getTableByRole(req.body.role);

    if(tableName === ""){
        res.send("Can't find corresponding table");
        return;
    }
    const verifyQuery = "SELECT `username` FROM " + tableName;

    db.query(verifyQuery, (error, data) => {
        if(error)
            return res.json(error);
        return res.json(data);
    })
});

app.post("/register", (req, res) => {
    const values = [
        req.body.username,
        req.body.password,
        req.body.firstName,
        req.body.lastName,
        0
    ];
    let tableName = getTableByRole(req.body.role);

    if(tableName === ""){
        res.send("Can't find corresponding table");
        return;
    }
    const query = "INSERT INTO " + tableName + " (`username`, `password`, `firstName`, `lastName`, `currentAmount`) VALUES (?)";

    db.query(query, [values], (error, data) => {
        if(error)
            return res.json(error);
        return res.json("New user has been added successfully");
    })
});

app.post("/login", (req, res) => {
    let tableName = getTableByRole(req.body.role);
    if(tableName === ""){
        res.send("Can't find corresponding table");
        return;
    }
    const verifyQuery = "SELECT * FROM " + tableName + " WHERE `username` = ? AND `password` = ?";

    db.query(verifyQuery,[req.body.username, req.body.password], (error, data) => {
        if(error){
            res.send({error: error});
        }
        if(data.length > 0){
            res.send(data);
        }else{
            res.send({message: "Wrong username/password"});
        }
    })
});

app.post("/getuserinfo", (req, res) => {
    let tableName = getTableByRole(req.body.role);
    if(tableName === ""){
        res.send("Can't find corresponding table");
        return;
    }
    const verifyQuery = "SELECT * FROM " + tableName + " WHERE `username` = ?";

    db.query(verifyQuery,[req.body.username], (error, data) => {
        if(error){
            res.send({error: error});
        }
        if(data.length > 0){
            res.send(data);
        }else{
            res.send({message: "Wrong username/password"});
        }
    })
});
app.post("/userinfo", (req, res) => {
    let tableName = getTableByRole(req.body.role);
    if(tableName === ""){
        res.send("Can't find corresponding table");
        return;
    }
    const query = "SELECT * FROM " + tableName + " WHERE `username` = ?";
    db.query(query, req.body.username, (error, data) => {
      if (error) {
        return res.send(error);
      }
      return res.send(data);
    });
});

app.put("/userinfo/update-execute", (req, res) => {
    let tableName = getTableByRole(req.body.role);
    if(tableName === ""){
        res.send("Can't find corresponding table");
        return;
    }

    const query = "UPDATE " + tableName + " SET `password`= ?, `firstName`= ?, `lastName`= ? WHERE `username` = ?";

    const values = [
        req.body.password,
        req.body.firstName,
        req.body.lastName,
        req.body.username
    ];

    db.query(query, values, (error, data) => {
        if (error) 
            return res.send(error);
        return res.json(data);
    });
});

app.listen(8800, ()=>{
    console.log("Connected to backend");
});