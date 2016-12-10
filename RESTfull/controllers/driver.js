module.exports = (DriverService, promiseHandler) => {
    const BaseController = require('./base');

    Object.setPrototypeOf(DriverController.prototype, BaseController.prototype);

    function DriverController(DriverService, promiseHandler) {
        BaseController.call(this, DriverService, promiseHandler);

        this.routes['/'] = [{ method: 'get', cb: readAll }];
        this.routes['/create'] = [{ method: 'post', cb: create }];
        this.routes['/update'] = [{ method: 'put', cb: update }];

        this.registerRoutes();
        return this.router;

        function update(req, res) {

            DriverService.update(req.body).then((result)=>{
                res.json(result)
            }).catch((err) => res.error(err));
        }

        function create(req, res) {

            DriverService.create(req.body).then((result)=>{
                res.json(result)
            }).catch((err) => res.error(err));
        }

        function readAll(req, res) {
            DriverService.readChunk(req.query)
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => res.error(err));
        }
    }
    return new DriverController(DriverService, promiseHandler);
};