"use strict";
const consts_1 = require("./consts");
class config {
    constructor() {
        var util = require('util');
        var exists = require('file-exists-sync').default;
        var fs = require('fs');
        var path = require('path');
        var mkdirp = require('mkdirp');
        var configPath = path.join(process.cwd(), 'config');
        if (process.env.CONFIG_PATH) {
            configPath = path.resolve(process.env.CONFIG_PATH);
        }
        mkdirp.sync(configPath);
        var configuration_file_path = path.join(configPath, consts_1.consts.CONFIG_NAME);
        if (exists(configuration_file_path))
            this.appSettings = JSON.parse(fs.readFileSync(configuration_file_path, 'utf8').replace(/^\uFEFF/, ''));
        else
            this.appSettings = require("../templates/" + consts_1.consts.CONFIG_NAME);
        var modules_file_name = path.join(configPath, consts_1.consts.MODULES_NAME);
        if (exists(modules_file_name))
            this.modulesSettings = JSON.parse(fs.readFileSync(path.join(configPath, consts_1.consts.MODULES_NAME), 'utf8').replace(/^\uFEFF/, ''));
        else
            this.modulesSettings = require("../templates/" + consts_1.consts.MODULES_NAME);
    }
}
exports.config = config;
