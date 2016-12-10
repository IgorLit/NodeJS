module.exports = (DriverRepository, errors) => {
    const BaseService = require('./base');
    const config =require('../config.json');

    Object.setPrototypeOf(DriverService.prototype, BaseService.prototype);

    function DriverService(DriverRepository, errors) {
        BaseService.call(this, DriverRepository, errors);

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
                DriverRepository.findAndCountAll({
                        limit: limit,
                        offset: offset,
                        order: [[orderColumn, options.order[0].dir.toUpperCase()]],
                        raw: true,
                        where: {
                            $or: [
                                {
                                    DRIVER_FIO: {
                                        $like: searchKey
                                    }
                                }, {
                                    DRIVER_BIRTHDATE: {
                                        $like: searchKey
                                    }
                                }, {
                                    DRIVER_ADRESS: {
                                        $like: searchKey
                                    }
                                }, {
                                    DRIVER_RULES: {
                                        $like: searchKey
                                    }
                                },{
                                    DRIVER_RULES_DATE: {
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
                let driver = {

                    DRIVER_FIO: data.DRIVER_FIO,
                    DRIVER_BIRTHDATE: data.DRIVER_BIRTHDATE,
                    DRIVER_ADRESS: data.DRIVER_ADRESS,
                    DRIVER_PASSPORT: data.DRIVER_PASSPORT,
                    DRIVER_RULES: data.DRIVER_RULES,
                    DRIVER_RULES_DATE: data.DRIVER_RULES_DATE,
                    DRIVER_CATEGORY: data.DRIVER_CATEGORY
                };

                self.baseCreate(driver)
                    .then(resolve).catch(reject);
            });
        }

        function update(req) {
            let data = req.data[0];
            return new Promise((resolve, reject) => {
                let driver = {

                    DRIVER_FIO: data.DRIVER_FIO,
                    DRIVER_BIRTHDATE: data.DRIVER_BIRTHDATE,
                    DRIVER_ADRESS: data.DRIVER_ADRESS,
                    DRIVER_PASSPORT: data.DRIVER_PASSPORT,
                    DRIVER_RULES: data.DRIVER_RULES,
                    DRIVER_RULES_DATE: data.DRIVER_RULES_DATE,
                    DRIVER_CATEGORY: data.DRIVER_CATEGORY
                };

                self.baseUpdate(data.id, driver)
                    .then(resolve).catch(reject);
            });
        }




    }

    return new DriverService(DriverRepository, errors);
};