"use strict";
const consts_1 = require("./consts");
class config {
    constructor() {
        var util = require('util');
        var fs = require('fs');
        var path = require('path');
        var configPath = path.join(path.resolve('config'));
        if (process.env.CONFIG_PATH) {
            configPath = path.resolve(process.env.CONFIG_PATH);
        }
        this.appSettings = JSON.parse(fs.readFileSync(path.join(configPath, consts_1.consts.CONFIG_NAME), 'utf8').replace(/^\uFEFF/, ''));
        try {
            if (fs.statSync(path.join(configPath, consts_1.consts.MODULES_NAME)) !== null)
                this.modulesSettings = JSON.parse(fs.readFileSync(path.join(configPath, consts_1.consts.MODULES_NAME), 'utf8').replace(/^\uFEFF/, ''));
        }
        catch (error) {
            console.log("no modules configuration");
        }
    }
}
exports.config = config;
