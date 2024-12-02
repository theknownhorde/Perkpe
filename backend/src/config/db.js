const mongoose = require('mongoose');

const connectDB = async () => {

    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((()=> console.log("mongo Connected"))).catch(()=>console.log("failed to connect"));
    // console.log(`MongoDB Connected: ${conn.connection.host}`);

};
//.

module.exports = connectDB;
