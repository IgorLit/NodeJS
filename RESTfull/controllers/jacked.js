module.exports = (jackedService, promiseHandler) => {
    const BaseController = require('./base');

    Object.setPrototypeOf(JackedController.prototype, BaseController.prototype);

    function JackedController(jackedService, promiseHandler) {
        BaseController.call(this, jackedService, promiseHandler);

        this.routes['/'] = [{ method: 'get', cb: readAll }];
        this.routes['/create'] = [{ method: 'post', cb: create }];
        this.routes['/update'] = [{ method: 'put', cb: update }];

        this.registerRoutes();
        return this.router;

        function update(req, res) {

            jackedService.update(req.body).then((result)=>{
                res.json(result)
            }).catch((err) => res.error(err));
        }

        function create(req, res) {

            jackedService.create(req.body).then((result)=>{
                res.json(result)
            }).catch((err) => res.error(err));
        }

        function readAll(req, res) {
            jackedService.readChunk(req.query)
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => res.error(err));
        }
    }
    return new JackedController(jackedService, promiseHandler);
};