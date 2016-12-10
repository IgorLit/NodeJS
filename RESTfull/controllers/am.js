module.exports = (amService, promiseHandler) => {
    const BaseController = require('./base');

    Object.setPrototypeOf(AmController.prototype, BaseController.prototype);

    function AmController(amService, promiseHandler) {
        BaseController.call(this, amService, promiseHandler);

        this.routes['/'] = [{ method: 'get', cb: readAll }];
        this.routes['/create'] = [{ method: 'post', cb: create }];
        this.routes['/update'] = [{ method: 'put', cb: update }];

        this.registerRoutes();
        return this.router;

        function update(req, res) {

                amService.update(req.body).then((ams)=>{
                    res.json(ams)
                }).catch((err) => res.error(err));

        }

        function create(req, res) {

                amService.create(req.body).then((ams)=>{
                    res.json(ams)
                }).catch((err) => res.error(err));

        }
        function readAll(req, res) {
            amService.readChunk(req.query)
                .then((ams) => {
                    res.json(ams)
                })
                .catch((err) => res.error(err));
        }


    }

    return new AmController(amService, promiseHandler);
};