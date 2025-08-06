module.exports = (req,res)=>{

    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/')+1);
    // console.log(baseUrl);
    let id = req.url.split('/')[3];
    const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    // console.log(id);
    if(req.url === "/"){
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.write(JSON.stringify({title: "Welcome", message: "Welcome to the API"}));
        res.end();
    }else if(req.url === "/api/data"){
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.write(JSON.stringify(req.data));
        res.end();
    }else if(!regexV4.test(id)){
        res.writeHead(400, {'Content-Type': 'application/json'});
        
        res.end(JSON.stringify({title: "Validation Failed", message: 'Data not found'}));
    }else if(regexV4.test(id) && baseUrl === "/api/data/"){
        
        res.setHeader('content-type', 'application/json');
        let filteredData = req.data.filter(item => item.id == id);
        if(filteredData.length > 0){
            res.statusCode = 200;
            res.write(JSON.stringify(filteredData));
        }else{
            res.statusCode = 404;
            res.write(JSON.stringify({title: "Not Found", message: "Data not found"}));
        }
        // res.write(req.data.filter(item=> item.id === id));
        res.end();
    }else{
        res.writeHead(404, {'Content-Type': 'application/json'});
        
        res.end(JSON.stringify({title: "Not Found", message: 'Resource not found'}));
    }
};