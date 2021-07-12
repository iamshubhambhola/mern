const express= require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const path = require('path');

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
//routes
app.use('/api/items', items);

//server static assets if in production
if(process.env.NODE_ENV === 'production'){
//set static folder
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    })


}

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server started at port :${port}`));