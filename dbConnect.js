const mongoose = require("mongoose");

async function dbConnect() { 
    const Connected = mongoose.connect(
      process.env.MONGO_URI
    );
    
    mongoose.connection.on("connected", () => { 
        console.log("Connected to MongoDB");
    });
    
    mongoose.connection.on("error", (err) => {
        console.log("Error connecting to MongoDB", err);
    }
    );

    mongoose.connection.on("disconnected", () => {
        console.log("Disconnected from MongoDB");
    });

    return Connected;

}

module.exports = dbConnect;


// , {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true,
        
//     }