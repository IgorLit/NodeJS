module.exports = (markService, promiseHandler) => {
    const BaseController = require('./base');

    Object.setPrototypeOf(MarkController.prototype, BaseController.prototype);

    function MarkController(markService, promiseHandler) {
        BaseController.call(this, markService, promiseHandler);

        this.routes['/'] = [{ method: 'get', cb: readAll }];
        this.routes['/create'] = [{ method: 'post', cb: create }];
        this.routes['/update'] = [{ method: 'put', cb: update }];

        this.registerRoutes();
        return this.router;

        function update(req, res) {

            markService.update(req.body).then((result)=>{
                res.json(result)
            }).catch((err) => res.error(err));
        }

        function create(req, res) {

            markService.create(req.body).then((result)=>{
                res.json(result)
            }).catch((err) => res.error(err));
        }

        function readAll(req, res) {
            markService.readChunk(req.query)
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => res.error(err));
        }
    }
    return new MarkController(markService, promiseHandler);
};