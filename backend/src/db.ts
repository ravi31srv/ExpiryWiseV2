import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://ravi31study_db_user:Ravi31srv%40@ac-txjv2yx-shard-00-00.djkfmsd.mongodb.net:27017,ac-txjv2yx-shard-00-01.djkfmsd.mongodb.net:27017,ac-txjv2yx-shard-00-02.djkfmsd.mongodb.net:27017/expirywise?ssl=true&replicaSet=atlas-12b7dv-shard-0&authSource=admin&appName=expirywise-app-cluster';
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
