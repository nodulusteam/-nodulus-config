
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
        var fs = require('fs');
        var path = require('path');

        var configPath = path.join(path.resolve('config'));
        if (process.env.CONFIG_PATH) {
            configPath = path.resolve(process.env.CONFIG_PATH);
        }

        
        this.appSettings = JSON.parse(fs.readFileSync(path.join(configPath, consts.CONFIG_NAME), 'utf8').replace(/^\uFEFF/, ''));
        this.modulesSettings = JSON.parse(fs.readFileSync(path.join(configPath, consts.MODULES_NAME), 'utf8').replace(/^\uFEFF/, ''));
    }
}