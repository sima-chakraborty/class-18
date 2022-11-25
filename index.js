const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require("helmet");
require('dotenv').config();
const mongoose = require('mongoose');
const Users = require('./model/Users');




const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());

const uri = process.env.uri;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to database");
});


app.get('/', function (req, res) {
    res.send('Hello World')
});

app.post("/users", async (req, res) => {
    const newUser = new Users({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        passward: req.body.passward
    });
    const responseFromDB = await newUser.save();
    res.status(200).json({
        message: "Users created successfully",
        success: true,
        responseFromDB,
    });
});

app.get("/users", async (req, res) => {
    console.log("GET request received");
    const user = await Users.find();
    res.status(200).json({
        message: "user fetched successfully",
        success: true,
        user,
    });
});

//delete for data
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const responseFromDB = await Users.findByIdAndDelete(id);
    res.status(200).json({
        message: " deleteed successfully",
        success: true,
        responseFromDB
    });
});

//update for data
app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const responseFromDB = await Users.findByIdAndUpdate(id,
        {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            passward: req.body.passward
        },
        {
            new: true,
            new: true,
            new: true,
            new: true,
        }
    );
    res.status(200).json({
        message: "users updated successfully",
        success: true,
        responseFromDB
    });
});

app.listen(3050, () => {
    console.log("server is running on port : http://localhost:3050 ")
});