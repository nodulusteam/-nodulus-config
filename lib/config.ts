
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
var fs = require("fs-extra");
var path = require('path');


var configPath = path.join(process.cwd(), 'config');
if (process.env.CONFIG_PATH) {
    configPath = path.resolve(process.env.CONFIG_PATH);
}

var configuration_file_path = path.join(configPath, consts.CONFIG_NAME);



export class config {
    public appSettings: any;
    public modulesSettings: any;

    constructor() {
        var util = require('util');
        var exists = require('file-exists-sync').default;


        var mkdirp = require('mkdirp');


        mkdirp.sync(configPath);


        if (exists(configuration_file_path))
            this.appSettings = JSON.parse(fs.readFileSync(configuration_file_path, 'utf8').replace(/^\uFEFF/, ''));

        else
            this.appSettings = require("../templates/" + consts.CONFIG_NAME);


        if (this.appSettings["database"].diskdb)
            fs.ensureDirSync(path.resolve(this.appSettings["database"].diskdb.host));


        var modules_file_name = path.join(configPath, consts.MODULES_NAME);
        if (exists(modules_file_name))
            this.modulesSettings = JSON.parse(fs.readFileSync(path.join(configPath, consts.MODULES_NAME), 'utf8').replace(/^\uFEFF/, ''));
        else
            this.modulesSettings = require("../templates/" + consts.MODULES_NAME);
    }



    public persistConfiguration() {

        if (this.appSettings["database"].diskdb)
            fs.ensureDirSync(path.resolve(this.appSettings["database"].diskdb.host));


        fs.writeFileSync(configuration_file_path, JSON.stringify(this.appSettings), 'utf8');
    }

}