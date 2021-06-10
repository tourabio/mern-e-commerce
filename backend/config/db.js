import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log(`MongoDb Connected : ${con.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error : ${error.message}`.red.underline.bold)
    process.exit(1) //exit(1)=> with failure
  }
}
export default connectDB
