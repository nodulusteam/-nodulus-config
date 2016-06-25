# @nodulus/config




 configuration component for nodulus.
  
[logo]: https://travis-ci.org/nodulusteam/-nodulus-config.svg?branch=master  

 


 ### install
 `npm install @nodulus/config`
 
 
 ### usage
 ```
 var config=require("@nodulus/config").config;
 var consts=require("@nodulus/config").consts;
 
 var settings = config.appSettings;
 ```
 
 
 
 ### config file format 
 
 ```
 {
  "name": "nodulus",
  "url": "",
  "port": "4000",
  "appRoot": "/",
  "enableSockets": true,
  "database": {
    "mongodb": {
      "useObjectId": true,
      "host": "---mongo url---"
    }
    ||
    { "diskdb": { "host": "server/data" } }
  }
}
 
 ```
 ### set config file location
```
 SET CONFIG_PATH = '--config--path--'
 
```