"use strict";
var config = require('./lib/config').config;
exports = module.exports = config;
module.exports.config = config;
//export {* as config}  from './lib/config';
var consts_1 = require('./lib/consts');
exports.consts = consts_1.consts;
