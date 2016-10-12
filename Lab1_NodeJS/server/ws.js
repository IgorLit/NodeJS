/**
 * Created by User on 07.10.2016.
 */
"use strict";
var WebSocketServer = new require('ws');
var alertService= new require('./alertService');

const Options={
    ALWAYS: "always",
    ONECE:"1",
    UNSUBSCRIBE:"unSub"
};
let alerts = new alertService();
var webSocketServer = new WebSocketServer.Server({
    port: 8081
});
webSocketServer.on('connection', function(ws) {
    var id = Math.random();
    var Subscriber ={
        id:id,
        socket:ws,
        event:null,
        option:null,
        always:false,
        onece:false,
        unsub:false,
        amount:null,
        number:null,
        packData:"",
        count:0,
        action:(data,alertService)=>{
            switch (Subscriber.option){
                case Options.ALWAYS:
                    Subscriber.socket.send(data);{
                    Subscriber.count++;
                }
                    break;
                case Options.UNSUBSCRIBE:
                    //unsub
                    alertService.unsubscribe(Subscriber.event,Subscriber.id);
                    break;
                default:
                    if(Subscriber.amount==null) {
                        Subscriber.amount = Subscriber.option;
                        Subscriber.number=Subscriber.count;
                    }
                    if(Subscriber.count-Subscriber.number<Subscriber.amount) {
                        Subscriber.packData+=data;
                        if(Subscriber.count-Subscriber.number+1==Subscriber.amount) {
                            Subscriber.socket.send(Subscriber.packData);
                            alertService.unsubscribe(Subscriber.event, Subscriber.id);
                        }
                        Subscriber.count++;
                    }
                    else {
                        //unsub
                        alertService.unsubscribe(Subscriber.event,Subscriber.id);
                        Subscriber.amount=null;
                    }
            }

        }
    };

    console.log("OnConnection:)");
    ws.on('message', function(message) {//incoming messages management
        let action = message.charAt(0);//действие
        let options = message.substring(1);//Дополнительные параметры
        if(action&&options) {
            Subscriber.option=options;
            Subscriber.event=action;
            alerts.subscribe(action, Subscriber);
        }
    });

    ws.on('close', function() {
        console.log('соединение закрыто ' + id);
        alerts.unsubscribeAll(Subscriber.id);
    });
});
exports.Alert=alerts.alert;