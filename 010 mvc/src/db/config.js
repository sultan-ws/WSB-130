const { default: mongoose } = require("mongoose");

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sultan.luvya.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`
mongoose.connect(url)
    .then(() => {
        console.log('connected to database')
    })
    .catch(err => {
        console.log(err.message)
    });