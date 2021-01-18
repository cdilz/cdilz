// https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel

const url = require('url')
const MongoClient = require('mongodb').MongoClient

module.exports = async (req, res) => 
{
  let client = await MongoClient.connect(process.env.MONGO_LOGIN, { useNewUrlParser: true })
  let db = await client.db(url.parse(process.env.MONGO_LOGIN).pathname.substr(1))
  try
  {
    let collection = await db.collection('login')

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

    await collection.updateOne(query, update, config)
    res.status(200).json({})
  }
  catch (e)
  {
    res.status(500).json(e)
  }
  finally
  {
    client.close()
  }
}