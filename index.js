const { MongoClient } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        //Create
        const register = await client.db("local").collection("startup_log").insertOne({
                username : "CJQ",
                password : "password",
                name : "CJQ",
                email : "cheokjiaqing@gmail.com"
            })
        console.log("succesfully registered");

        //Read
        const find = await client.db("local").collection("startup_log").find({"username":"JQ"}).toArray();
        console.log("succesfully found");

        //Update
        const update = await client.db("local").collection("startup_log").updateOne({"username":"JQ"},{$set:{"password":"newpassword"}});
        console.log(" succesfully updated");

        //Delete
        const del = await client.db("local").collection("startup_log").deleteOne({"username":"CJQ"});
        console.log("succesfully deleted");

        // Make the appropriate DB calls
        await listDatabases(client);

        } catch (e) {
            console.error(e);
        } finally {
            // Close the connection to the MongoDB cluster
            await client.close();
        }
}

run().catch(console.error); // Run the async function

// Print the names of all available databases
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

const bycrypt = require('bcrypt')
const password = "password"
const saltRounds = 5

bycrypt.genSalt(saltRounds, function(saltError, salt){
    if (saltError){
        throw saltError
    }else{
        bycrypt.hash(password, salt, function(hashError, hash){
            if (hashError){
                throw hashError
            }else{
                console.log(hash)
            }
        })
    }
})
