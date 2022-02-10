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
    let loginCollection = await db.collection('login')
    let messageCollection = await db.collection('message')

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

    await loginCollection.updateOne(query, update, config)

    /*
      At this point we need to recieve all messages specifically for this user.
      We'd get the messages, who's it from, etc.
    */

    let messageQuery =
    {
      key: input.key,
      sent: 
        {
          $gte: new Date(input.lastRecieve)
        }
    }

    let messages = await messageCollection.find(messageQuery).sort({sent: 1}).toArray()

    let ids = []
    for(let i = 0; i < messages.length; i++)
    {
      let message = messages[i]
      ids.push(message['_id'])
    }

    let deleteQuery =
    {
      _id:
      {
        $in: ids
      }
    }

    await messageCollection.deleteMany(deleteQuery)
    
    res.status(200).json(messages)
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

/*
module.exports = async (request, response) => 
{
  (res)
  const { body } = req
  res.send({message: `Hello ${body.name}, you just parsed the request body!`})
}
*/