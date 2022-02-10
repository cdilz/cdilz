// https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel

const url = require('url')
const MongoClient = require('mongodb').MongoClient

module.exports = async (req, res) => 
{
  let client
  try
  {
    client = await MongoClient.connect(process.env.MONGO_LOGIN, { useNewUrlParser: true })
    let db = await client.db(url.parse(process.env.MONGO_LOGIN).pathname.substr(1))

    const collection = await db.collection('message')
    let bulkMessage = collection.initializeUnorderedBulkOp()
    for(let i = 0; i < req.body.length; i++)
    {
      req.body[i].sent = new Date()
      bulkMessage.insert(req.body[i])
    }

    await bulkMessage.execute()
    res.status(200).json({})
  }
  catch (e)
  {
    res.status(500).json(e)
  }
  finally
  {
    if(typeof client != typeof undefined)
    {
      client.close()
    }
  }
}