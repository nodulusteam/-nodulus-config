
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
var modules_file_name = path.join(configPath, consts.MODULES_NAME);


 class Singleton {
        private _initialized: boolean;

        private _setSingleton(): void {
            if (this._initialized) throw Error('Singleton is already initialized.');
            this._initialized = true;
        }
      
        //get setSingleton() { return this._setSingleton; }
    }

 class config extends Singleton {
    public appSettings: any;
    public modulesSettings: any;

    private static _instance: config = new config();
    public static getInstance(): config {
        return config._instance;
    }
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
            this.appSettings = require("../templates/" + consts.CONFIG_NAME);


        if (this.appSettings["database"].diskdb)
            fs.ensureDirSync(path.resolve(this.appSettings["database"].diskdb.host));



        if (exists(modules_file_name))
            this.modulesSettings = require(path.join(configPath, consts.MODULES_NAME));
        else
            this.modulesSettings = require("../templates/" + consts.MODULES_NAME);

        if (!this.modulesSettings) {
            require("../templates/" + consts.MODULES_NAME);
        }

        return config._instance;

    }





    public mergeConfiguration(configuration_to_merge: any, key: string) {
        this.appSettings[key] = configuration_to_merge;
        this.persistConfiguration();
    }


    public persistConfiguration() {
        fs.writeFileSync(configuration_file_path, JSON.stringify(this.appSettings), 'utf8');
    }


    public persistModules() {
        fs.writeFileSync(modules_file_name, JSON.stringify(this.modulesSettings), 'utf8');
    }

}


 
exports.config = config.getInstance();


