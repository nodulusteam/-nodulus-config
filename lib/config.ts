
/*                 _       _           
                 | |     | |          
  _ __   ___   __| |_   _| |_   _ ___ 
 | '_ \ / _ \ / _` | | | | | | | / __|
 | | | | (_) | (_| | |_| | | |_| \__ \
 |_| |_|\___/ \__,_|\__,_|_|\__,_|___/
 @nodulus open source | ©Roi ben haim  ®2016    
 */
/// <reference path="../typings/main.d.ts" />
import {consts} from "./consts";

 

export class config {
    public appSettings: any;
    public modulesSettings: any;

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

        var configuration_file_path = path.join(configPath, consts.CONFIG_NAME);
        if (exists(configuration_file_path))
            this.appSettings = JSON.parse(fs.readFileSync(configuration_file_path, 'utf8').replace(/^\uFEFF/, ''));

        else
            this.appSettings = require("../templates/" + consts.CONFIG_NAME);

        var modules_file_name = path.join(configPath, consts.MODULES_NAME);
        if (exists(modules_file_name))
            this.modulesSettings = JSON.parse(fs.readFileSync(path.join(configPath, consts.MODULES_NAME), 'utf8').replace(/^\uFEFF/, ''));
        else
            this.modulesSettings = require("../templates/" + consts.MODULES_NAME);
    }
}