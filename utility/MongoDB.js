import { MongoClient } from 'mongodb'

export default class MongoDB {
    #client
    #database
    #login
    #database_name
    #login_collection
    #message_collection

    constructor() {
        this.#login  = process.env.MONGO_LOGIN
        // Get the database and query string off the end of the url
        const split_login = this.#login.split('/').pop()
        // Get the database from the start of the previous variable
        this.#database_name = split_login.split('?').shift()         
    }

    async #client_connect() {
        try {
            if(!this.exists(this.#client)) {
                this.#client = await MongoClient.connect(this.#login)
            }

            return this.#client
        } catch(e) {
            throw e
        }
    }

    async #database_connect() {
        try {
            const client = this.#client_connect()

            if(!this.exists(client)) {
                throw 'Client does not exist still'
            }

            if(!this.exists(this.#database)) {
                this.#database = await client.db(this.#database_name)
            }

            return this.#database
        } catch(e) {
            throw e
        }
    }

    async #collection_connect() {
        try {
            const database = this.#database_connect()

            if(!this.exists(database)) {
                throw 'Database does not exist still'
            }


            if(!this.exists(this.#login_collection)) {
                this.#login_collection = await database.collection('login')
            }

            if(!this.exists(this.#message_collection)) {
                this.#message_collection = await database.collection('message')
            }

            return
        } catch(e) {
            throw e
        }
    }

    async #upsertOne(collection, query, values) {
        try {
            await this.connect()
            return await collection.updateOne(query, values, {
                upsert: true
            })
        } catch (e) {
            throw e
        }
    }

    async #find(collection, query, options) {
        try {
            await this.connect()
            let cursor = collection.find(query)

            if(this.exists(options.project)) {
                cursor = cursor.project(options.project)
            }

            if(this.exists(options.sort)) {
                cursor = cursor.sort(options.sort)
            }

            if(this.exists(options.toArray)) {
                cursor = cursor.toArray()
            }

            return await cursor
        } catch (e) {
            throw e
        }
    }

    async #bulk_insert(collection, values) {
        try {
            await this.connect()

            // BulkOperation batches cannot be empty
            if(values.length === 0) {
                return
            }

            const bulk_operation = collection.initializeUnorderedBulkOp()
            for(let i = 0; i < values.length; i++) {
                bulk_operation.insert(item)
            }

            return await bulk_operation.execute()
        } catch (e) {
            throw e
        }
    }

    async #delete_many(collection, query) {
        try {
            await this.connect()
            return await collection.deleteMany(query)
        } catch (e) {
            throw e
        }
    }

    async connect() {
        try {
            this.#collection_connect()
        } catch(e) {
            this.close()
            throw e
        }
    }

    close() {
        try {
            if(this.exists(this.#client)) {
                this.#client.close()

                this.#client = undefined
                this.#database = undefined
                this.#login_collection = undefined
                this.#message_collection = undefined
            }
        } catch(e) {
            throw e
        }
    }

    exists(value) {
        return typeof value !== typeof undefined && value !== null
    }

    async login(input) {
        try {
            await this.connect()
            const key = input.key
            const name = input.name
            const color = input.color

            const query = { key }
            const values = {
                $currentDate: {
                  modified: true
                },
                $set: {
                  name,
                  color,
                  key
                }
            }

            this.#upsertOne(this.#login_collection, query, values)
        } catch(e) {
            throw e
        }
    }

    async receive(input) {
        try {
            await this.connect()
            const key = input.key
            const last_received = input.last_received

            await this.login(input)

            /*
            At this point we need to receive all messages specifically for this user.
            We'd get the messages, who's it from, etc.
            */
            const message_query = {
                key,
                sent: {
                    $gte: new Date(last_received)
                }
            }

            const messages = await this.#find(this.#message_collection, message_query, {
                sort: {sent: 1},
                toArray: true
              })


            const ids = []
            messages.forEach(message => {
                ids.push(message['_id'])
            });
        
            const delete_query = {
                _id: {
                    $in: ids
                }
            }
        
            await this.#delete_many(this.#message_collection, delete_query )

            return messages
        } catch(e) {
            throw e
        }
    }

    async send(input) {
        try {
            await this.connect()
            for(let i = 0; i < input.length; i++) {
                input[i].sent = new Date()
            }
            await this.#bulk_insert(this.#message_collection, input)
        } catch(e) {
            throw e
        }
    }

    async get_users() {
        try {
            await this.connect()
            return await this.#find(this.#login_collection, {}, {
                project: {key: 1, _id: 0},
                toArray: true
            })
        } catch(e) {
            throw e
        }
    }
}
