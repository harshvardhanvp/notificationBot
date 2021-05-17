const mongoose = require('mongoose');

const connectDB = async () => {

    const conn = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    console.log(`MONGODB Connected : ${conn.connection.host}`);

}


module.exports = connectDB;