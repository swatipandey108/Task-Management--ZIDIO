const express = require('express');
const app = express();  
require("dotenv").config();
require('./conn/conn');

app.use("/", (req, res) => {
    res.send("Hello World");
});
const PORT =  1000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

     