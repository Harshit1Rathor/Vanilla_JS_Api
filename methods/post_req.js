const crypto = require('crypto');
const requestBodyParser = require('./util/body_parser');
const fs = require('./util/file_system')
module.exports = async (req,res)=>{

    try {
        let body = await requestBodyParser(req);
        body.id = crypto.randomUUID();
        req.data.push(body);
        fs(req.data);
        res.statusCode = 201;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({title: "Post Request", message: "Data received Successfully"}));
    } catch (err) {
        res.statusCode = 400;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({title: 'Bad Request', message: 'Invalid data format'}));
    }

};