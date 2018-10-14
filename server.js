let express = require("express");
let app = express();
let server = require("http").createServer(app);
let io = require("socket.io").listen(server);
let count = 0;
server.listen(process.env.PORT || "3243");

console.log("Server Running...");
console.log(count);
app.get("/", (req, res)=>{res.sendFile(__dirname + "/Ludo.html")});

io.sockets.on("connection",function(socket){
   count++;
   console.log("No. of Players Online are: " + count);
   socket.on("disconnect", function(data){
       count--;
       console.log("No. of Players Online are: "+ count);
   });
   socket.on("new throw", function(data){
       console.log("it's working");
       socket.broadcast.emit("this throw", data);
   })
});