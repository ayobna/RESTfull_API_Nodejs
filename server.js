const http= require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server= http.createServer(app);
server.listen(port,()=>{    //listen is a method of http.createServer
    console.log(`Server is running on port ${port}`);
});

