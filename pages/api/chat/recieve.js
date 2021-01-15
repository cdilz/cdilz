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
  // Get a database connection, cached or otherwise,
  // using the connection string environment variable as the argument
  const db = await connectToDatabase(process.env.MONGO_LOGIN)

  // Select the "users" collection from the database
  const collection = await db.collection('login')

  let input = req.body
  
  let query =
  {
    key: input.key
  }

  let update =
  {
    $currentDate:
    {
      modified: true
    },
    $set:
    {
      name: input.name,
      color: input.color,
      key: input.key
    }
  }

  let config = 
  {
    upsert: true
  }

  // Select the users collection from the database
  // const users = await collection.find({}).toArray()

    collection.update(query, update, config

  )

  



  /*
    At this point we need to recieve all messages specifically for this user.
    We'd get the messages, who's it from, etc.
  */
















  // Respond with a JSON string of all users in the collection
  //res.status(200).json({ users })
  res.json(req.body)
}

/*
module.exports = async (request, response) => 
{
  console.log(res)
  const { body } = req
  res.send({message: `Hello ${body.name}, you just parsed the request body!`})
}
*/ 