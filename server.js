const http=require('http');
const PORT=process.env.PORT || 150;
const app=require('./app');
const server=http.createServer(app);


server.listen(PORT,(req,res)=>{
    console.log("Server is listening on 150!");
});