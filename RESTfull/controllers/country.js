module.exports = (CountryService, promiseHandler) => {
    const BaseController = require('./base');

    Object.setPrototypeOf(CountryController.prototype, BaseController.prototype);

    function CountryController(CountryService, promiseHandler) {
        BaseController.call(this, CountryService, promiseHandler);

        this.routes['/'] = [{ method: 'get', cb: readAll }];
        this.routes['/create'] = [{ method: 'post', cb: create }];
        this.routes['/update'] = [{ method: 'put', cb: update }];

        this.registerRoutes();
        return this.router;

        function update(req, res) {

            CountryService.update(req.body).then((result)=>{
                res.json(result)
            }).catch((err) => res.error(err));
        }

        function create(req, res) {

            CountryService.create(req.body).then((result)=>{
                res.json(result)
            }).catch((err) => res.error(err));
        }

        function readAll(req, res) {
            CountryService.readChunk(req.query)
                .then((result) => {
                    res.json(result);
                })
                .catch((err) => res.error(err));
        }
    }
    return new CountryController(CountryService, promiseHandler);
};