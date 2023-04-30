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

module.exports = {getAllUser,createUser,deleteUser}