module.exports = (markRepository, errors) => {
    const BaseService = require('./base');
    const config =require('../config.json');

    Object.setPrototypeOf(MarkService.prototype, BaseService.prototype);

    function MarkService(markRepository, errors) {
        BaseService.call(this, markRepository, errors);

        let self = this;

        self.create = create;
        self.update = update;
        self.readChunk=readChunk;

        function readChunk(options) {
            return new Promise((resolve, reject) => {
                options = Object.assign({}, config.defaults.readChunk, options);

                var limit = Number(options.length);
                var offset = Number(options.start);
                var searchKey = '%' + options.search.value + '%';
                var orderColumnNumber = Number(options.order[0].column);
                if(options.columns)
                    var orderColumn = options.columns[orderColumnNumber].data;
                else
                    var orderColumn = "id";
                markRepository.findAndCountAll({
                        limit: limit,
                        offset: offset,
                        order: [[orderColumn, options.order[0].dir.toUpperCase()]],
                        raw: true,
                        where: {
                            $or: [
                                {
                                    MARK_NAME: {
                                        $like: searchKey
                                    }
                                }

                            ]
                        }
                    }
                ).then((result)=>{
                    if(options.search.value.length>0)
                        resolve({"data": result.rows,
                            "options": [],
                            "files": [],
                            "draw":options.draw,
                            "recordsTotal": result.count,
                            "recordsFiltered": result.rows.length});
                    else
                        resolve({"data": result.rows,
                            "options": [],
                            "files": [],
                            "draw":options.draw,
                            "recordsTotal": result.count,
                            "recordsFiltered": result.count});
                }).catch(reject);
            });
        }

        function create(req) {
            let data = req.data[0];
            return new Promise((resolve, reject) => {
                let entity = {

                    MARK_NAME: data.MARK_NAME
                };

                self.baseCreate(entity)
                    .then(resolve).catch(reject);
            });
        }

        function update(req) {
            let data = req.data[0];
            return new Promise((resolve, reject) => {
                let entity = {
                    MARK_NAME: data.MARK_NAME
                };

                self.baseUpdate(data.id, entity)
                    .then(resolve).catch(reject);
            });
        }




    }

    return new MarkService(markRepository, errors);
};