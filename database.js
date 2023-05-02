const { json } = require("body-parser");
const { ObjectId } = require("mongodb");
const nodemailer = require("nodemailer");


//configuração de email
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "botresponsebot@gmail.com",
        pass: "tytuiywzvrvmzdru"
    },
    tls: { rejectUnauthorized: false }
});

//envio do email
async function mailSent(assunto,email,user) {

    await transporter.sendMail({
        text: "convite do evento " + assunto.atividades.descricao+ " no dia " +assunto.atividades.data + " ás "+ assunto.atividades.hora+ " no local "+ assunto.atividades.loalizacao + " com duração prevista de "+ assunto.atividades.duracao,
        subject: 'convite de reunião de ' + user,
        from: "botresponsebot@gmail.com",
        to: email,
    })
}



//função para procurar todos os usuários
async function getAllUser(client) {
    const result = await client.db("lc").collection("user").find().toArray();
    if (result) {
        console.log(`found a listing in the collection `);
        console.log(result);
        return result
    } else {
        console.log(`no listings found`);
        return {}
    }
}
//função para criar um usuário
async function createUser(client,newListing){
    const result = await client.db("lc").collection("user").insertOne(newListing)
    return result
}
//função para deletar um usuário
async function deleteUser(client,listing){
    const result= await client.db("lc").collection("user").deleteMany(listing)
    return result
}
//funcão para adicionar um evento e enviar um email
async function addevent (client, newListing) {
    const result = await client.db("lc").collection("events").insertOne(newListing)
    if(newListing.atividades.convidados!=undefined){
    emails = JSON.stringify(newListing.atividades.convidados)
    emails = emails.slice(1,emails.length-1)
    emails = emails.split(",")
    for(i=0;emails[i]!=undefined;i++){
        mailSent(newListing,emails[i],newListing.email)
    }
    }
    console.log(`${result.matchedCount} document(s) matched the query criteria`)
    console.log(`${result.modifiedCount} documents was/were updated`)
}


//função para procurar um evento pelo criador dele
async function getEvent(client,email) {
    const result = await client.db("lc").collection("events").find({email:email.email}).toArray();
    if (result) {
        console.log(`found a listing in the collection `);
        console.log(result);
        return result
    } else {
        console.log(`no listings found`);
        return {}
    }
}
//função para deletar um evento pelo ID dele
async function deleteEvent(client,eventId){
    const result= await client.db("lc").collection("events").deleteOne({"_id":new ObjectId(eventId._id)})
    return result
}

module.exports = {getAllUser,createUser,deleteUser, addevent,mailSent,getEvent,deleteEvent}