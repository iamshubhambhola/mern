# mern
1.npm init
2.npm i express body-parser mongoose concurrently
//////// used body-parser for store data in json and CONCURRENTLY we use to run backend and frintend at same time(not in 2 terminals)
3.npm i -D nodemon

//in package.json -> go to scripts and remove tests and add 

    "start": "node server.js",
    "server": "nodemon server.js"

now create server.js

SERVER.JS
///////////////////////
const express= require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());
///////////////////////

Now create a CLUSTER in mongocloud website and copy the URI

create a folder named config/keys.js
///////////////
create a mongo cluster....ip address should be of 6hrs or before and then connect...
///////////////
module.exports = {
    mongoURI: "///////mongouri here////////////";
}
//////////////

now in server.js add this to connect mongodb
////////////////////////////////////////////////
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

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server started at port :${port}`));
///////////////////////////////////////////////////////////

now create a folder model/item.js
//////////////////////////////////////////////////////////////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const itemSchema = new Schema({
    name:{
        type: String,
        rquired: true,
        unique: true,
        minlength: 3
    },
    data:{
        type: Date,
        default: Date.now
    },
},{
    timestamps: true,
});

const Item = mongoose.model('Item',itemSchema);

module.exports = Item;
////////////////////////////////////////////////////////////// 

now we have to perform CRUD operation,,, for that create folder routes/api/items.js
 and thereafter add following code in server.js..
//////////////////////////////////////////////////////////////

const items = require('./routes/api/items');
app.use('/api/items', items);

///////////////////////////////////////////////////////////////
add following code in routes/api/items.js  CRUD
///////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();

//item model
const Item = require('../../models/item');

//@route GET api/items
//@desc Get All items
//@access Public
router.get('/',(req,res)=>{
    Item.find()
        .sort({date: -1})
        .then(items=>res.json(items))
});

//@route POST api/items
//@desc create a post
//@access Public
router.delete('/:id',(req,res)=>{
    Item.findById(req.params.id)
        .then(item=> item.remove().then(()=> res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}));
});

//@route DELETE api/items
//@desc delete a post
//@access Public
router.post('/',(req,res)=>{
    const newItem = new Item({
        name: req.body.name
    })
    newItem.save().then(item => res.json(item));
});


module.exports = router;
///////////////////////////////////////////////////////////////////

NOW RUN npx create-react-app client

///////////////////////////////////////////////////////////////////
in order to use concurrently add following in package.json ---> scripts of backend folder 
///////////////////////////////////////////////////////////////

  "scripts": {
    "client-install": "npm install --prefix client",
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
/////////////////////////////////////////////////////////////////////////////////////

Now goto package.json of react app client folder add following before DEPENDENCIES {  }:
////////////////////////////////////////////////////
"proxy" : "http:localhost:5000",
//////////////////////////////////////////////////////


Now go to react app ------>>>> cd client
Now run 
///////for using bootstrap css/////////////////////////////////////////////////
npm i bootstrap reactstrap uuid react-transition-group
////////////////////////////uuid for random ids not req for now///////////////////////////////
goto app.js add following for bootstarp :::::::::::::::::::::
/////////////////////////////////////////
import "bootstrap/dist/css/bootstrap.min.css";
/////////////////////////////////////////
now rest things and packages u can search on google ...install them,,,,,import and then use.............!!!
/////////////////////////////////////////////////////////////////////////////////////////////////////////
Now in order to see what i am doing in react just go to GitHub repo mern and see there I've added comments
/////////////////////////////////////////////////////////////////////////////////////////////////////////







1.npm init
2.npm i express body-parser mongoose concurrently
//////// used body-parser for store data in json and CONCURRENTLY we use to run backend and frintend at same time(not in 2 terminals)
3.npm i -D nodemon

//in package.json -> go to scripts and remove tests and add 

    "start": "node server.js",
    "server": "nodemon server.js"

now create server.js

SERVER.JS
///////////////////////
const express= require('express');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());
///////////////////////

Now create a CLUSTER in mongocloud website and copy the URI

create a folder named config/keys.js
///////////////
create a mongo cluster....ip address should be of 6hrs or before and then connect...
///////////////
module.exports = {
    mongoURI: "///////mongouri here////////////";
}
//////////////

now in server.js add this to connect mongodb
////////////////////////////////////////////////
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

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`server started at port :${port}`));
///////////////////////////////////////////////////////////

now create a folder model/item.js
//////////////////////////////////////////////////////////////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const itemSchema = new Schema({
    name:{
        type: String,
        rquired: true,
        unique: true,
        minlength: 3
    },
    data:{
        type: Date,
        default: Date.now
    },
},{
    timestamps: true,
});

const Item = mongoose.model('Item',itemSchema);

module.exports = Item;
////////////////////////////////////////////////////////////// 

now we have to perform CRUD operation,,, for that create folder routes/api/items.js
 and thereafter add following code in server.js..
//////////////////////////////////////////////////////////////

const items = require('./routes/api/items');
app.use('/api/items', items);

///////////////////////////////////////////////////////////////
add following code in routes/api/items.js  CRUD
///////////////////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();

//item model
const Item = require('../../models/item');

//@route GET api/items
//@desc Get All items
//@access Public
router.get('/',(req,res)=>{
    Item.find()
        .sort({date: -1})
        .then(items=>res.json(items))
});

//@route POST api/items
//@desc create a post
//@access Public
router.delete('/:id',(req,res)=>{
    Item.findById(req.params.id)
        .then(item=> item.remove().then(()=> res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}));
});

//@route DELETE api/items
//@desc delete a post
//@access Public
router.post('/',(req,res)=>{
    const newItem = new Item({
        name: req.body.name
    })
    newItem.save().then(item => res.json(item));
});


module.exports = router;
///////////////////////////////////////////////////////////////////

NOW RUN npx create-react-app client

///////////////////////////////////////////////////////////////////
in order to use concurrently add following in package.json ---> scripts of backend folder 
///////////////////////////////////////////////////////////////

  "scripts": {
    "client-install": "npm install --prefix client",
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
/////////////////////////////////////////////////////////////////////////////////////

Now goto package.json of react app client folder add following before DEPENDENCIES {  }:
////////////////////////////////////////////////////
"proxy" : "http:localhost:5000",
//////////////////////////////////////////////////////


Now go to react app ------>>>> cd client
Now run 
///////for using bootstrap css/////////////////////////////////////////////////
npm i bootstrap reactstrap uuid react-transition-group
////////////////////////////uuid for random ids not req for now///////////////////////////////
goto app.js add following for bootstarp :::::::::::::::::::::
/////////////////////////////////////////
import "bootstrap/dist/css/bootstrap.min.css";
/////////////////////////////////////////
now rest things and packages u can search on google ...install them,,,,,import and then use.............!!!
/////////////////////////////////////////////////////////////////////////////////////////////////////////
Now in order to see what i am doing in react just go to GitHub repo mern and see there I've added comments
/////////////////////////////////////////////////////////////////////////////////////////////////////////







