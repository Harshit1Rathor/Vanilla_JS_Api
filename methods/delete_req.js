module.exports = (req,res)=>{
        const id = req.url.split('/')[3];
        const baseUrl = req.url.substring(0, req.url.lastIndexOf('/')+1);
        const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
        const fs = require('./util/file_system');
        

            if(!regexV4.test(id)){
                
                res.setHeader('content-type', 'application/json');
                res.statusCode = 400;
                
    
                res.end(JSON.stringify({title: "Validation Failed", message: "Enter a Valid Id!"}));
            }else if(regexV4.test(id) && baseUrl ==="/api/data/"){

                let data = req.data.filter(item=> item.id != id);
                console.log(data);
    
                res.setHeader('content-type', 'application/json');
                res.statusCode = 200;
                fs(data);
                res.write(JSON.stringify(data));
                res.end(JSON.stringify({title: "Delete Request", message: "Data deleted successfully"}));
            }else{
                res.setHeader('content-type', 'application/json');
                res.statusCode = 404;
                
    
                res.end(JSON.stringify({title: "Request Invalid", message: "Data not deleted!"}));
            }
        
};