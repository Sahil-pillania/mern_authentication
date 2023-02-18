const mongoose = require("mongoose");
//const DB = process.env.DATABASE;
const DB =
  "mongodb+srv://sahil:Sahil1234@cluster0.cxi2awi.mongodb.net/mernwebsite?retryWrites=true&w=majority";

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log("mongo connected successfully");
//   })
//   .catch((err) => {
//     console.log("Error occured during connecting to database - " + err);
//   });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`mongo database is connected!!! ${conn.connection.host} `);
  } catch (error) {
    console.error(`Error: ${error} `);
    process.exit(1); //passing 1 - will exit the proccess with error
  }
};

// export default connectDB;
module.exports = connectDB;
