import mongoose from 'mongoose'

let isConnected = false

export const conmectToDB = async () => {
  mongoose.set('strictQuery', true)
  if (isConnected) {
    console.log('already connected to mongdb')
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Project 0',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    isConnected = true
    console.log('im connected')
  } catch (error) {
    console.log(error)
  }
}
