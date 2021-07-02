const express= require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');

const items = require('./routes/api/items');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongo
const connectDB = async ()=> {
    try {
        await mongoose.connect(db,{
            useNewUrlParser : true,
            useUnifiedTopology: true
        });
        console.log('mongodb connected...');
    } catch (err) {
        console.log(err.message);
        //exit process 1
        process.exit(1);
    }
} 
connectDB();

app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server started at port :${port}`));