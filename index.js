const express = require("express");
const app = express();
const user =require("./database")
const route = require("./router")

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
const port = 3000;

app.use(route);
app.get("/",(req,res)=>{
    res.render("index"); 
})

app.listen(port,()=>{
    console.log("our server runing on port no 3000");
})