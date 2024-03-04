var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();  // Create our app

app.use(bodyParser.json()); // Middleware for parsing
app.use(express.static('public'));// Serve static files from the
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies (this is required)

mongoose.connect('mongodb://localhost:27017/Database');
var db = mongoose.connection;

db.on('error', () => console.log("Error in connecting to Database"));
db.once('open', () => {
    console.log("Connected with database");
});

app.post("/sign_up", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const password = req.body.password;

    var data = {
        "name": name,
        "age": age,
        "email": email,
        "phone": phone,
        "Gender": gender,
        "password": password
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Data inserted successfully!");
    });

    return res.redirect('succesful.html');
});

app.get('/', (req, res) => {
    res.set({
        "allow-access-allow-origin": '*'
    });
    return res.redirect('index.html');
}).listen(3000);

console.log("Server listening on port 3000");
