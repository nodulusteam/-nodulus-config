"use strict";
const consts_1 = require("./consts");
var fs = require("fs-extra");
var path = require('path');
var configPath = path.join(process.cwd(), 'config');
if (process.env.CONFIG_PATH) {
    configPath = path.resolve(process.env.CONFIG_PATH);
}
var configuration_file_path = path.join(configPath, consts_1.consts.CONFIG_NAME);
var modules_file_name = path.join(configPath, consts_1.consts.MODULES_NAME);
var configuration;
(function (configuration) {
    class Singleton {
        _setSingleton() {
            if (this._initialized)
                throw Error('Singleton is already initialized.');
            this._initialized = true;
        }
    }
    configuration.Singleton = Singleton;
    class config extends Singleton {
        constructor() {
            super();
            if (config._instance) {
                return config._instance;
            }
            var util = require('util');
            var exists = require('file-exists-sync').default;
            var mkdirp = require('mkdirp');
            mkdirp.sync(configPath);
            if (exists(configuration_file_path))
                this.appSettings = JSON.parse(fs.readFileSync(configuration_file_path, 'utf8').replace(/^\uFEFF/, ''));
            else
                this.appSettings = require("../templates/" + consts_1.consts.CONFIG_NAME);
            if (this.appSettings["database"] && this.appSettings["database"].diskdb)
                fs.ensureDirSync(path.resolve(this.appSettings["database"].diskdb.host));
            if (exists(modules_file_name))
                this.modulesSettings = require(path.join(configPath, consts_1.consts.MODULES_NAME));
            return config._instance;
        }
        static getInstance() {
            return config._instance;
        }
        mergeConfiguration(configuration_to_merge, key) {
            this.appSettings[key] = configuration_to_merge;
            this.persistConfiguration();
        }
        persistConfiguration() {
            fs.writeFileSync(configuration_file_path, JSON.stringify(this.appSettings), 'utf8');
        }
        persistModules() {
            fs.writeFileSync(modules_file_name, JSON.stringify(this.modulesSettings), 'utf8');
        }
    }
    config._instance = new config();
    configuration.config = config;
})(configuration || (configuration = {}));
module.exports.config = configuration.config.getInstance();
