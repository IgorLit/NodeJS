var querystring = require("querystring"),
    fs = require("fs"),
    url = require("url"),
    mysql = require("mysql");
var log4js = require('log4js');
var log = require('./log');
var ws = require('./ws')


function start(response, postData) {
    console.log("Request handler 'start' was called.");
    //log.write("test");
    log.write("Request handler 'start' was called.");
    fs.readFile('../Web/index.html', function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
}
function remove(response,request) {
    var query = url.parse(request.url).query;
    var id = querystring.parse(query).id;
    var type = querystring.parse(query).type;
    if (id != null) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'admin',
            password: 'root',
            database: 'articles'
        });
        connection.connect();
        var table;
        if(type=="article")
            table="article";
        else if(type=="comment")
            table="comment";
        connection.query('DELETE FROM '+table+' WHERE id = ?', id, function (err, result) {
            if (!err) {
                log.write("Удаление записи с id " + id + " выполнено без ошибок");
               // ws.sendNotice("1"+"Удаление записи с id " + id);
                ws.Alert(1,"Удаление записи с id " + id+"</br>");
                response.end();

            }
            else {
                log.write("При удалении записи с id " + id + " произошла ошибка:" + err);
                response.end("Error:"+err);
            }

        });
    }
    else {
        log.write("Отправлен пустой запрос к remove или тип не существует");
        response.end("Неверные параметры запроса");
    }
}

function update(response, request) {
    console.log("Request handler 'update' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    var query = url.parse(request.url).query;
    if(query!=null) {


        console.log(querystring.parse(query).id);
        var id = querystring.parse(query).id;
        var author = querystring.parse(query).author;
        var header = querystring.parse(query).header;
        var text = querystring.parse(query).text;
        var date = querystring.parse(query).date;
        var table = querystring.parse(query).table;
        console.log("date before:"+date);
        if(!textValidation(author)||!textValidation(text)||!dateValidation(date))
        {
            response.write("Error: invalid parameters");
        }
        else {
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'admin',
                password: 'root',
                database: 'articles'
            });
            var query;
            var params;
            if (table == "article") {
                query = 'UPDATE article SET author = ?,header=?,text=?,date=? WHERE id = ?';
                params = [author, header, text, date, id];
            }
            else if (table == "comments") {
                query = 'UPDATE comment SET author = ?,text=? WHERE id = ?';
                params = [author, text, id];
            }
            connection.connect();
            connection.query(query, params, function (err, result) {
                if (!err) {
                    response.writeHead(200, {"Content-Type": "text/plain"});
                    //log.write("Ошибка:" + result);
                   // ws.sendNotice("3"+"Изменен элемент с id "+id+" на новые значения "+params);
                    ws.Alert(3,"Изменен элемент с id "+id+" на новые значения "+params+"</br>")
                    response.end();
                }
                else {
                    log.write('Error while performing Query.');
                    response.end(err);
                }
            });
            connection.end();
            console.log(id + author + header + text + date);

        }
    }
    response.end();
}
function textValidation(sample) {
    var regexp = /^[а-яА-ЯёЁa-zA-Z]+$/;
    return regexp.test(sample);
}
function numValidation(sample) {
    var regexp = /^[0-9]+$/;
    return regexp.test(sample);
}
function dateValidation(sample) {
    var regexp = /[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/;
    return regexp.test(sample);
}
function add(response,request){
    log.write("'Add' was called");
    response.writeHead(200, {"Content-Type": "text/plain"});
    var query = url.parse(request.url).query;
    if(query!=null) {
        console.log(querystring.parse(query).id);
        var author = querystring.parse(query).author;
        console.log("------------------------>"+textValidation(author));
        var header = querystring.parse(query).header;
        var text = querystring.parse(query).text;
        var date = querystring.parse(query).date;
        var table =querystring.parse(query).table;
        if(!textValidation(author)||!textValidation(header)||!textValidation(text)||!dateValidation(date))
        {
            response.write("Error: invalid parameters");
        }
        else {
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'admin',
                password: 'root',
                database: 'articles'
            });
            var query;
            var params;
            if (table == "article") {
                query = 'INSERT INTO article(text, date,author,header) VALUES (?,?,?,?)';
                params = [text, date, author, header];
            }
            else if (table == "comment") {
                query = 'INSERT INTO comment(articId,author,text) VALUES (?,?,?)';
                params = [articleId, author, text];
            }
            connection.connect();
            connection.query(query, params, function (err, result) {
                if (!err) {
                    response.writeHead(200, {"Content-Type": "text/plain"});
                    log.write("результат insert запроса" + result);
                   // ws.sendNotice("2"+"Добавлен новый в таблицу "+table+" Значения:"+params);
                    ws.Alert(2,"Добавлен новый в таблицу "+table+" Значения:"+params+"</br>")
                    response.end();
                }
                else {
                    log.write('Error while performing Query.');
                    response.end();
                }
            });
            connection.end();
        }
    }
    response.end();
}
var articleId=-1;
function more(response,request) {
    var query = url.parse(request.url).query;
    articleId = querystring.parse(query).id;
    log.write("Request handler 'more' was called.");
    fs.readFile('../Web/detailes.html', function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
}
function getMore(response,request) {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'root',
        database: 'articles'
    });
    connection.connect();
    connection.query('SELECT * from comment where articId=?', [articleId], function (err, result) {
        if (!err) {
            //response.writeHead(200, {"Content-Type": "text/plain"});
            log.write("результат getMore запроса" + result);
            response.write(JSON.stringify(result));
            connection.end();
            response.end();

        }
        else {
            log.write('Error while performing Query.');
            connection.end();
            response.end();
        }
    });

}

function show(response, postRequest) {
    log.write("Request handler 'show' was called.");
    var query = url.parse(postRequest.url).query;
    var searchStr="";

    searchStr= querystring.parse(query).search;
    var sort = querystring.parse(query).sort;
    var connection = mysql.createConnection({
        host:     'localhost',
        user:     'admin',
        password: 'root',
        database: 'articles'
    });
    connection.connect();
    var quer='SELECT * from article where author  like ? or header like ? or text like ?';
    var parms =['%'+searchStr+'%','%'+searchStr+'%','%'+searchStr+'%'];
    if(articleId!=-1) {
        quer += 'or id = ?';
        parms=['%'+searchStr+'%','%'+searchStr+'%','%'+searchStr+'%',articleId];
    }
    if(sort=="true"){
        quer+="ORDER BY date";
    }

    connection.query(quer,parms, function(err, rows) {
        if (!err) {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(rows));
            response.end();
        }
        else {
            log.write('Error while performing Query.');
            response.end();
        }
    });
    connection.end();
}
function getLog(response,request) {
    fs.readFile('./log.log', function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHead(200, {"Content-Type": "text"});
        response.write(html);
        response.end();
    });
}
function loadSubscription(response,request) {
    console.log("Request handler 'sub' was called.");
    //log.write("test");
    log.write("Request handler 'sub' was called.");
    fs.readFile('../Web/sub.html', function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
}
exports.start = start;
exports.loadSubscription=loadSubscription;
exports.update = update;
exports.show = show;
exports.add=add;
exports.remove=remove;
exports.more=more;
exports.getMore=getMore;
exports.getLog=getLog;