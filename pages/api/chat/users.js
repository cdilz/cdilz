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
		let logins = await collection.find({}).project({key: 1, _id: 0}).toArray()

  	res.status(200).json(logins)
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