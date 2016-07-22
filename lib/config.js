"use strict";
/*                 _       _
                 | |     | |
  _ __   ___   __| |_   _| |_   _ ___
 | '_ \ / _ \ / _` | | | | | | | / __|
 | | | | (_) | (_| | |_| | | |_| \__ \
 |_| |_|\___/ \__,_|\__,_|_|\__,_|___/
 @nodulus open source | ©Roi ben haim  ®2016
 */
/// <reference path="../typings/main.d.ts" />
var consts_1 = require("./consts");
var fs = require("fs-extra");
var path = require('path');
var configPath = path.join(process.cwd(), 'config');
if (process.env.CONFIG_PATH) {
    configPath = path.resolve(process.env.CONFIG_PATH);
}
var configuration_file_path = path.join(configPath, consts_1.consts.CONFIG_NAME);
var config = (function () {
    function config() {
        var util = require('util');
        var exists = require('file-exists-sync').default;
        var mkdirp = require('mkdirp');
        mkdirp.sync(configPath);
        if (exists(configuration_file_path))
            this.appSettings = JSON.parse(fs.readFileSync(configuration_file_path, 'utf8').replace(/^\uFEFF/, ''));
        else
            this.appSettings = require("../templates/" + consts_1.consts.CONFIG_NAME);
        if (this.appSettings["database"].diskdb)
            fs.ensureDirSync(path.resolve(this.appSettings["database"].diskdb.host));
        var modules_file_name = path.join(configPath, consts_1.consts.MODULES_NAME);
        if (exists(modules_file_name))
            this.modulesSettings = JSON.parse(fs.readFileSync(path.join(configPath, consts_1.consts.MODULES_NAME), 'utf8').replace(/^\uFEFF/, ''));
        else
            this.modulesSettings = require("../templates/" + consts_1.consts.MODULES_NAME);
    }
    config.prototype.persistConfiguration = function () {
        if (this.appSettings["database"].diskdb)
            fs.ensureDirSync(path.resolve(this.appSettings["database"].diskdb.host));
        fs.writeFileSync(configuration_file_path, JSON.stringify(this.appSettings), 'utf8');
    };
    return config;
}());
exports.config = config;
