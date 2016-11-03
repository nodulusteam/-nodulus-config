
/*                 _       _           
                 | |     | |          
  _ __   ___   __| |_   _| |_   _ ___ 
 | '_ \ / _ \ / _` | | | | | | | / __|
 | | | | (_) | (_| | |_| | | |_| \__ \
 |_| |_|\___/ \__,_|\__,_|_|\__,_|___/
 @nodulus open source | ©Roi ben haim  ®2016    
 */
/// <reference path="../typings/main.d.ts" />
import { consts } from "./consts";
const fs = require("fs-extra");
const path = require('path');
const merge = require('merge');
const chokidar = require('chokidar');





var configPath = path.join(process.cwd(), 'config');
if (process.env.CONFIG_PATH) {
    configPath = path.resolve(process.env.CONFIG_PATH);
}



var configuration_file_path = path.join(configPath, consts.CONFIG_NAME);
var modules_file_name = path.join(configPath, consts.MODULES_NAME);

module configuration {


    export class Singleton {
        private _initialized: boolean;

        private _setSingleton(): void {
            if (this._initialized) throw Error('Singleton is already initialized.');
            this._initialized = true;
        }

        //get setSingleton() { return this._setSingleton; }
    }

    export class config extends Singleton {
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

            var templateConfig = require("../templates/" + consts.CONFIG_NAME);

            if (exists(configuration_file_path)) {

                // One-liner for current directory, ignores .dotfiles 
                chokidar.watch(configuration_file_path, {
                    usePolling: false,
                    ignored: /[\/\\]\./
                }).on('all', (event: any, path: string) => {
                    console.log(event, path);
                    this.appSettings = require(configuration_file_path);
                    this.appSettings = merge(templateConfig, this.appSettings);

                });
                this.appSettings = require(configuration_file_path);
                this.appSettings = merge(templateConfig, this.appSettings);
            }
            else {
                this.appSettings = require("../templates/" + consts.CONFIG_NAME);
                this.persistConfiguration();
            }


            try {
                if (this.appSettings["database"] && this.appSettings["database"].diskdb)
                    fs.ensureDirSync(path.resolve(this.appSettings["database"].diskdb.host));
            } catch (e) {
                console.log('bad data directory', this.appSettings["database"].diskdb);
            }

            if (exists(modules_file_name))
                this.modulesSettings = require(path.join(configPath, consts.MODULES_NAME));

            return config._instance;
        }

        public mergeConfiguration(configuration_to_merge: any, key: string) {
            this.appSettings[key] = configuration_to_merge;
            this.persistConfiguration();
        }


        public persistConfiguration() {
            fs.writeFileSync(configuration_file_path, 'module.exports=' + JSON.stringify(this.appSettings, null, "\t"), 'utf8');
        }


        public persistModules() {
            fs.writeFileSync(modules_file_name, 'module.exports=' + JSON.stringify(this.modulesSettings, null, "\t"), 'utf8');
        }

    }

}
module.exports.config = configuration.config.getInstance();