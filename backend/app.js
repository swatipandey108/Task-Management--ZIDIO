const express = require('express');
const app = express();  

require("dotenv").config();
require('./conn/conn');

const cors = require('cors');

const userAPI = require('./routes/user');
const taskAPI = require('./routes/task');

// adding middlewares to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());

app.use("/api/v1", userAPI);
// used for taking data when someone is logged in
// localhost:1000/api/v1/sign-in   

app.use("/api/v2", taskAPI);

app.use("/", (req, res) => { 
    res.send("Hello from backend side");
});

const PORT =  1000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

     