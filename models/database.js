import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

class Database {
    constructor(url, dbName) {
        this.url = url
        this.dbName = dbName
        this.client = new MongoClient(url)
        this.database = null
    }
    async connect() {
        try {
            console.log('Waiting for connect to database...')
            await this.client.connect()
            // this.client = await MongoClient.connect(this.url)
            this.database = this.client.db(this.dbName)
            console.log('Connected correctly to database!')
        } catch (err) {
            console.log(err)
            console.log('Error connecting to database!')
            await this.client.close()
        }

        // finally {
        //     await client.close()
        // }
    }

    createCollection(name) {
        // await this.connect()
        if (this.database) {
            return this.database.collection(name)
        }
        return null
    }

    // async add(name, data) {
    //     if (this.database !== null) {
    //         const collection = this.database.collection(name)

    //         return await collection.insertOne(data)
    //     }
    // }
    // async find(name, data) {
    //     if (this.database !== null) {
    //         const collection = this.database.collection(name)

    //         return await collection.findOne(data)
    //     }
    // }
    // async remove(name, data) {
    //     if (this.database !== null) {
    //         const collection = this.database.collection(name)

    //         return await collection.deleteOne(name, data)
    //     }
    // }
    // async find_push(name, data, filter) {
    //     if (this.database !== null) {
    //         const collection = this.database.collection(name)

    //         await collection.findOneAndUpdate(
    //             filter,
    //             { $push: { products: data } },
    //             { upsert: true },
    //             function (err, user) {
    //                 //after mongodb is done updating, you are receiving the updated file as callback

    //                 // now you can send the error or updated file to client
    //                 if (err) res.send(err)

    //                 return 'error'
    //             }
    //         )
    //     }
    // }
}

// dotenv.config()
const dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017'
console.log(dbUrl)
// const myDb = new Database(dbUrl, 'TicketBox')

const connectDB = async () => {
    try {
        await myDb.connect()
        console.log('Connected to database')
    } catch (error) {
        console.log('Error connecting to database')
        console.log(error)
    }
}
// connectDB()

// export default myDb
