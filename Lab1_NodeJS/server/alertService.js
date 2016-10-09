"use strict";
var WebSocket = require('ws');
function alertsService () {
    let self = this;
    self.subscribes = {};
    self.subscribe = (event, cb) => {
        if(cb.option=="unSub"){
            self.unsubscribe(event,cb.id);
            return;
        }
        if (!self.subscribes[event])
            self.subscribes[event] = [];
        let cbs = self.subscribes[event];
        let idDuplication =false;
        if(cbs)
            for(var i=0;i<cbs.length;i++){
                if(cbs[i].id==cb.id)
                    idDuplication=true;

            }
        if(!idDuplication) {
            self.subscribes[event].push(cb);
            if (cb.socket.readyState === WebSocket.OPEN)
            cb.socket.send(1+""+cb.event);//Уведомление о подписке
            console.log("Добавлена новая подписка на "+event+" с id="+cb.id);
        }
    };
    self.unsubscribeAll=(id)=>{
        for(let event in self.subscribes){
           let cbs =self.subscribes[event];
            for(let i=0;i<cbs.length;i++)
            if(cbs[i].id==id)
                cbs.splice(i,1);
        }
    };

    self.alert = (event, data) => {
        if (!self.subscribes[event]) return;
        let cbs = self.subscribes[event];
        if(cbs)
            for (let i = 0; i < cbs.length; i++) {
                cbs[i].action(data,self);

            }
    };

    self.unsubscribe=(event,id)=>{
        let cbs = self.subscribes[event];
        if(cbs)
            for(var i=0;i<cbs.length;i++) {
                if(cbs[i].id==id) {
                    if (cbs[i].socket.readyState === WebSocket.OPEN)
                    cbs[i].socket.send(0+""+cbs[i].event);//Уведомление об отписке
                    cbs.splice(i, 1);//удаляет 1 элемента массива начиная с i
                    console.log("Подписка на "+event+" удалена "+id);
                }
            }
    }
}
module.exports=alertsService;

