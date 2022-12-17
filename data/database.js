const mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient

let database;

const connect = async () => {
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    database = client.db("sarSistem")
}

const getDb = ()=>{
    if(!database) throw {message: "Database connection not established"}
    return database
}

module.exports = {
    connectToDatabase: connect,
    getDb: getDb
}