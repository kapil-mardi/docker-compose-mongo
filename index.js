const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

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

app.listen(port, () => {
    console.log("server started on port " + port);
})
