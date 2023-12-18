
const mongoose = require('mongoose');

// mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, userUnifiedTopology:true,

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI,{
        dbName: 'ecommerceDB'
    })
    .then((data) =>{
        console.log(`Mongodb connected with server ${data.connection.host}`)
    }).catch((err) =>{
        console.log(err);
    })
}

module.exports = connectDatabase;
