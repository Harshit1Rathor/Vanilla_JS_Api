module.exports = async(req,res)=>{
    const requestBodyParser = require('./util/body_parser');
    const id = req.url.split('/')[3];
    const baseUrl = req.url.substring(0, req.url.lastIndexOf("/")+1);
    const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    const fs = require('./util/file_system');
    

    if(!regexV4.test(id)){
        res.statusCode = 400;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({title: "Validation Failed", message:"Enter a valid id."}));
    }else if(regexV4.test(id) && baseUrl === "/api/data/"){




        res.statusCode = 200;
        
        let data = req.data.filter(item=> item.id != id);

        // fs(data);

        let body = await requestBodyParser(req);
        
        body.id = id;
        
        data.push(body);
        
        fs(data);
        
        res.setHeader('content-type', 'application/json');
        res.write(JSON.stringify(data));
        res.end(JSON.stringify({title: "Put Request", message: "Data updated successfully"}));



    }else{
        res.statusCode = 404;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({title: "Not Found", message:"Data not found."}));
    }
                
        
    
};