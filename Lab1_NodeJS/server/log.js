var fs = require('fs');
function log(data) {
    fs.appendFile('log.log',Date()+' '+data+'\n',function (err) {
        if(err) throw err;
    });
}
exports.write=log;