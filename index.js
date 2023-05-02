const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const uri = "mongodb+srv://chalenge:leucotron@lc.tu7guum.mongodb.net/test"
const database = require('./database');
const express = require("express");
const app = express();
app.use(bodyParser.json());
const client = new MongoClient(uri);
reqs=0;
const port = 8080;

app.listen(port, () => {
console.log("Servidor iniciado na porta 8080: http://localhost:8080");
})

app.get("/", async (req, res) => {
    try{
    database.mailSent()
    res.send("pagina inicial leucotron_challenge")
    }catch(err){
        res.send(err)
    }
})
app.get("/allUsers", async(req,res)=>{
    try {
        reqs++;
        if (reqs == 1) {
            await client.connect();
        }
        const users = await database.getAllUser(client);
        res.send(users)

    } catch (err) {
        res.send("Ocorreu um erro: " + err)
    } finally {
        reqs--
        if (reqs == 0) {
            await client.close();
        }
    }
})
app.post("/create/user",async(req,res)=>{
    try{
        reqs++;
        if (reqs == 1) {
            await client.connect();
        }
        await database.createUser(client,req.body)
        res.send(req.body)
    }catch(err){
        res.send("Ocorreu um erro: " + err)
    }finally {
        reqs--
        if (reqs == 0) {
            await client.close();
        }
    }
})
app.delete("/delete/user",async(req,res)=>{
    try{
        reqs++;
        if (reqs == 1) {
            await client.connect();
        }
        await database.deleteUser(client,req.body)
        res.send(req.body)
    }catch(err){
        res.send("Ocorreu um erro: " + err)
    }finally {
        reqs--
        if (reqs == 0) {
            await client.close();
        }
    }
})
app.post("/addEvent", async(req,res)=>{
    try{
        reqs++;
        if (reqs == 1) {
            await client.connect();
        }
        await database.addevent(client,req.body)
        res.send(req.body)
    }catch(err){
        res.send("Ocorreu um erro: " + err)
    }finally {
        reqs--
        if (reqs == 0) {
            await client.close();
        }
    }
})
app.get("/event",async(req,res)=>{
    try {
        reqs++;
        if (reqs == 1) {
            await client.connect();
        }
        const users = await database.getEvent(client,req.body);
        res.send(users)

    } catch (err) {
        res.send("Ocorreu um erro: " + err)
    } finally {
        reqs--
        if (reqs == 0) {
            await client.close();
        }
    }
})
app.delete("/delete/event",async(req,res)=>{
    try{
        reqs++;
        if (reqs == 1) {
            await client.connect();
        }
        await database.deleteEvent(client,req.body)
        res.send(req.body)
    }catch(err){
        res.send("Ocorreu um erro: " + err)
    }finally {
        reqs--
        if (reqs == 0) {
            await client.close();
        }
    }
})
