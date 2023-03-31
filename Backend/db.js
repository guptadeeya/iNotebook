
const mongoose = require('mongoose');

// const mongoURI = ("mongodb://localhost:27017", {useNewUrlParser: true, useUnifiedTopology: true})
// .then( () => console.log("connection successful"))
// .catch((err) => console.log(err));

const mongoURI = "mongodb://localhost:27017"
const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        // if(err) console.log(`unable to connect to the server: ${err}`);
        // else
        console.log("Connected to mongoose successfully");
    })
}

module.exports = connectToMongo;