var browserDetect = require('browser-detect');
 
const visitorInfoObject = {
    ips:[],
    browsers:{
        firefox:0,
        safari:0,
        chrome:0
    }
}
 
const getVisitorInfo = () =>{
    return visitorInfoObject;
}
 
const visitorInfoMiddleware = (req,res,next) => {
    const browser = browserDetect(req.headers['user-agent']);
    switch(browser.name){
        case 'firefox':
            visitorInfoObject.browsers.firefox++;
            break;
        case 'safari':
            visitorInfoObject.browsers.safari++;
            break;
        case 'chrome':
            visitorInfoObject.browsers.chrome++;
            break;
    }
    const ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
 
    visitorInfoObject.ips.push(ip);
    next();
}
 
module.exports = {
    getVisitorInfo,
    visitorInfoMiddleware
}