module.exports = (FirmService, promiseHandler) => {
    const BaseController = require('./base');

    Object.setPrototypeOf(FirmController.prototype, BaseController.prototype);

    function FirmController(FirmService, promiseHandler) {
        BaseController.call(this, FirmService, promiseHandler);

        this.routes['/'] = [{ method: 'get', cb: readAll }];
        this.routes['/create'] = [{ method: 'post', cb: create }];
        this.routes['/update'] = [{ method: 'put', cb: update }];

        this.registerRoutes();
        return this.router;

        function update(req, res) {

            FirmService.update(req.body).then((result)=>{
                res.json(result)
            }).catch((err) => res.error(err));
        }

        function create(req, res) {

            FirmService.create(req.body).then((result)=>{
                res.json(result)
            }).catch((err) => res.error(err));
        }

        function readAll(req, res) {
            FirmService.readChunk(req.query)
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => res.error(err));
        }
    }
    return new FirmController(FirmService, promiseHandler);
};