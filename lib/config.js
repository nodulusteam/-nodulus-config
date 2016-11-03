"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var merge = require('merge');
var chokidar = require('chokidar');
var configPath = path.join(process.cwd(), 'config');
if (process.env.CONFIG_PATH) {
    configPath = path.resolve(process.env.CONFIG_PATH);
}
var configuration_file_path = path.join(configPath, consts_1.consts.CONFIG_NAME);
var modules_file_name = path.join(configPath, consts_1.consts.MODULES_NAME);
var configuration;
(function (configuration) {
    var Singleton = (function () {
        function Singleton() {
        }
        Singleton.prototype._setSingleton = function () {
            if (this._initialized)
                throw Error('Singleton is already initialized.');
            this._initialized = true;
        };
        return Singleton;
    }());
    configuration.Singleton = Singleton;
    var config = (function (_super) {
        __extends(config, _super);
        function config() {
            var _this = this;
            _super.call(this);
            if (config._instance) {
                return config._instance;
            }
            var util = require('util');
            var exists = require('file-exists-sync').default;
            var mkdirp = require('mkdirp');
            mkdirp.sync(configPath);
            var templateConfig = require("../templates/" + consts_1.consts.CONFIG_NAME);
            if (exists(configuration_file_path)) {
                // One-liner for current directory, ignores .dotfiles 
                chokidar.watch(configuration_file_path, {
                    usePolling: false,
                    ignored: /[\/\\]\./
                }).on('all', function (event, path) {
                    console.log(event, path);
                    _this.appSettings = require(configuration_file_path);
                    _this.appSettings = merge(templateConfig, _this.appSettings);
                });
                this.appSettings = require(configuration_file_path);
                this.appSettings = merge(templateConfig, this.appSettings);
            }
            else {
                this.appSettings = require("../templates/" + consts_1.consts.CONFIG_NAME);
                this.persistConfiguration();
            }
            try {
                if (this.appSettings["database"] && this.appSettings["database"].diskdb)
                    fs.ensureDirSync(path.resolve(this.appSettings["database"].diskdb.host));
            }
            catch (e) {
                console.log('bad data directory', this.appSettings["database"].diskdb);
            }
            if (exists(modules_file_name))
                this.modulesSettings = require(path.join(configPath, consts_1.consts.MODULES_NAME));
            return config._instance;
        }
        config.getInstance = function () {
            return config._instance;
        };
        config.prototype.mergeConfiguration = function (configuration_to_merge, key) {
            this.appSettings[key] = configuration_to_merge;
            this.persistConfiguration();
        };
        config.prototype.persistConfiguration = function () {
            fs.writeFileSync(configuration_file_path, 'module.exports=' + JSON.stringify(this.appSettings, null, "\t"), 'utf8');
        };
        config.prototype.persistModules = function () {
            fs.writeFileSync(modules_file_name, 'module.exports=' + JSON.stringify(this.modulesSettings, null, "\t"), 'utf8');
        };
        config._instance = new config();
        return config;
    }(Singleton));
    configuration.config = config;
})(configuration || (configuration = {}));
module.exports.config = configuration.config.getInstance();
