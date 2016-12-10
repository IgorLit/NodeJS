module.exports = (amRepository, errors) => {
    const BaseService = require('./base');
    const config =require('../config.json');
    Object.setPrototypeOf(AmService.prototype, BaseService.prototype);

    function AmService(amRepository, errors) {
        BaseService.call(this, amRepository, errors);

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
                amRepository.findAndCountAll({
                        limit: limit,
                        offset: offset,
                        order: [[orderColumn, options.order[0].dir.toUpperCase()]],
                        raw: true,
                        where: {
                            $or: [
                                {
                                    AM_REG_NUMBER: {
                                        $like: searchKey
                                    }
                                }, {
                                    AM_BODY_NUMBER: {
                                        $like: searchKey
                                    }
                                }, {
                                    AM_ENGINE_NUMBER: {
                                        $like: searchKey
                                    }
                                }, {
                                    AM_TECHPASSPORT_NUMBER: {
                                        $like: searchKey
                                    }
                                },{
                                    AM_BIRTHDATE: {
                                        $like: searchKey
                                    }
                                },{
                                    AM_REGISTRATION_DATE: {
                                        $like: searchKey
                                    }
                                },{
                                    AM_COLOR: {
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
                let am = {

                    AM_REG_NUMBER: data.AM_REG_NUMBER,
                    AM_BODY_NUMBER: data.AM_BODY_NUMBER,
                    AM_TECHPASSPORT_NUMBER: data.AM_TECHPASSPORT_NUMBER,
                    AM_ENGINE_NUMBER: data.AM_ENGINE_NUMBER,
                    AM_BODY_NUMBER: data.AM_BODY_NUMBER,
                    AM_REG_NUMBER: data.AM_REG_NUMBER,
                    AM_COLOR: data.AM_COLOR,
                    AM_REGISTRATION_DATE: data.AM_REGISTRATION_DATE,
                    AM_BIRTHDATE: data.AM_BIRTHDATE
                };

                self.baseCreate(am)
                    .then(resolve).catch(reject);
            });
        }

        function update(req) {
            let data = req.data[0];
            return new Promise((resolve, reject) => {
                let am = {
                    AM_REG_NUMBER: data.AM_REG_NUMBER,
                    AM_BODY_NUMBER: data.AM_BODY_NUMBER,
                    AM_TECHPASSPORT_NUMBER: data.AM_TECHPASSPORT_NUMBER,
                    AM_ENGINE_NUMBER: data.AM_ENGINE_NUMBER,
                    AM_BODY_NUMBER: data.AM_BODY_NUMBER,
                    AM_REG_NUMBER: data.AM_REG_NUMBER,
                    AM_COLOR: data.AM_COLOR,
                    AM_REGISTRATION_DATE: data.AM_REGISTRATION_DATE,
                    AM_BIRTHDATE: data.AM_BIRTHDATE
                };

                self.baseUpdate(data.id, am)
                    .then(resolve).catch(reject);
            });
        }




    }

    return new AmService(amRepository, errors);
};