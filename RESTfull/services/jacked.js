module.exports = (jackedRepository, errors) => {
    const BaseService = require('./base');
    const config =require('../config.json');

    Object.setPrototypeOf(JackedService.prototype, BaseService.prototype);

    function JackedService(jackedRepository, errors) {
        BaseService.call(this, jackedRepository, errors);

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
                jackedRepository.findAndCountAll({
                        limit: limit,
                        offset: offset,
                        order: [[orderColumn, options.order[0].dir.toUpperCase()]],
                        raw: true,
                        where: {
                            $or: [
                                {
                                    JC_JACKDATE: {
                                        $like: searchKey
                                    }
                                }, {
                                    JC_REPORT_DATE: {
                                        $like: searchKey
                                    }
                                }, {
                                    JC_ADDITIONAL: {
                                        $like: searchKey
                                    }
                                }, {
                                    JC_FOUND: {
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

                    JC_JACKDATE: data.JC_JACKDATE,
                    JC_REPORT_DATE: data.JC_REPORT_DATE,
                    JC_ADDITIONAL: data.JC_ADDITIONAL,
                    JC_FOUND: data.JC_FOUND
                };

                self.baseCreate(entity)
                    .then(resolve).catch(reject);
            });
        }

        function update(req) {
            let data = req.data[0];
            return new Promise((resolve, reject) => {
                let entity = {
                    JC_JACKDATE: data.JC_JACKDATE,
                    JC_REPORT_DATE: data.JC_REPORT_DATE,
                    JC_ADDITIONAL: data.JC_ADDITIONAL,
                    JC_FOUND: data.JC_FOUND
                };

                self.baseUpdate(data.id, entity)
                    .then(resolve).catch(reject);
            });
        }




    }

    return new JackedService(jackedRepository, errors);
};