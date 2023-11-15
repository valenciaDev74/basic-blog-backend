import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

const uri = 'mongodb+srv://' + process.env.MONGO_ATLAS_CONNECT_STRING

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function connect () {
  try {
    await client.connect()
    const database = client.db('blog-database')
    return database.collection('users')
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)

    await client.close()
  }
}

export class UsersModel {
  static async getAll () {
    const db = await connect()
    return db.find().toArray()
  }

  static async getById ({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    return db.findOne({ _id: objectId })
  }

  static async getByEmail ({ email }) {
    const db = await connect()
    return db.findOne({ email })
  }

  static async create ({ input }) {
    const db = await connect()
    const { insertedId } = await db.insertOne(input)
    return {
      insertedId,
      ...input
    }
  }

  static async delete ({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    const { deletedCount } = await db.deleteOne({ _id: objectId })
    return deletedCount > 0
  }

  static async encriptPassword ({ password }) {
    const salt = await bcrypt.genSalt(8)
    return await bcrypt.hash(password, salt)
  }

  static async decryptPassword ({ password, hash }) {
    return await bcrypt.compare(password, hash)
  }

  // static async update ({ id, input }) {
  //   const db = await connect()
  //   const objectId = new ObjectId(id)
  //   const { ok, value } = await db.findOneAndUpdate({ _id: objectId }, { $set: input }, { returnNewDocument: true })
  //   if (ok) return false
  //   return value
  // }
}
