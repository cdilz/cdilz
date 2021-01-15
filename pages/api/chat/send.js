// https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel

// Import Dependencies
const url = require('url')
const MongoClient = require('mongodb').MongoClient

// Create cached connection variable
let cachedDb = null

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
async function connectToDatabase(uri) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb
  }

  // If no connection is cached, create a new one
  const client = await MongoClient.connect(uri, { useNewUrlParser: true })

  // Select the database through the connection,
  // using the database path of the connection string
  const db = await client.db(url.parse(uri).pathname.substr(1))

  // Cache the database connection and return the connection
  cachedDb = db
  return db
}

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (req, res) => 
{

  /*
    Needs:
      list of all users active in the last x number of seconds/minutes
      user's name
      user's color
      user's message encrypted with key
      automated time log
      key of user to send to


    This will send a bulk of one message per user currently logged into the server
  */

  let db = await connectToDatabase(process.env.MONGO_LOGIN)
  let collection = await db.collection('login')
  let logins = await collection.find({}).toArray()
  let bulkMessage = collection.initializeUnorderedBulkOp()

  for(let i = 0; i < logins.length; i++)
  {
    let message =
    {
      userKey: logins[i].
    }
    console.log(logins[i])
  }

  res.status(200).json({})














  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument

  // Select the "users" collection from the database

  // Select the users collection from the database


  // Respond with a JSON string of all users in the collection
}

/*
module.exports = async (request, response) => 
{
  console.log(res)
  const { body } = req
  res.send({message: `Hello ${body.name}, you just parsed the request body!`})
}
*/