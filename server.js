const express = require('express');
const app = express();
const http = require ('http');
const path= require('path');
const port= process.env.port || 3001;
app.use(express.static(__dirname +'/dist/WeatherApp'));
app.get('/*',(req,res)=>res.sendFile(path.join(__dirname)));
const Server =http.createServer(app);
Server.listen(port,()=>console.log('Running....'));
