const http = require('http');
const data = require('./data/data.json');
<<<<<<< HEAD
const PORT =  process.env.PORT||5001;
=======
const PORT =  process.env.PORT || 3001;
>>>>>>> 5adc21547455e2be897246b1be020557764b673e

const getReq = require('./methods/get_req');
const putReq = require('./methods/put_req');
const postReq = require('./methods/post_req');
const deleteReq = require('./methods/delete_req');

const server = http.createServer((req, res)=>{
    
    req.data = data;
    
    switch(req.method){
        case 'GET':
            getReq(req, res);
            break;
        case 'POST':
            postReq(req, res);
            break;
        case 'PUT':
            putReq(req, res);
            break;    
        case 'DELETE':
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader('content-type', 'application/json');
            res.write(JSON.stringify({title: "Not Found", message: 'Method not found'}));
            res.end();

    }   
    
});

server.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`);
})

