const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const port = 3000;

app.use(express.json());

mongoose.connect(
    'mongodb://mongo:27017/user_data', 
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        authSource: "admin",
        user: "root",
        pass: "example"
    }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const users = mongoose.model('users', {
    name: {type: String},
    email: {type: String},
    userID: {type: Number}
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/user/:id', async (req, res) => {
    const user = await users.findOne({"userID": req.params.id}).exec();
        if (!user) {
            res.send("Error: ");
        }
        res.send(user);
});

app.post('/user', async (req, res) => {
    const user = req.body;
    console.log(user);
    const newUser = new users({...user});
    const u = await newUser.save();
    res.send(u);
    
});

app.listen(port, () => {
    console.log("server started on port " + port);
})
